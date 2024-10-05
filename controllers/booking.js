import bookingSchema from "../model/booking.js";
import doctorSchema from "../model/doctor.js";
import patientSchema from "../model/patient.js";


// create booking
export const createBooking = async (req, res) => {  
    // getting the required parameters for the booking
    const { bookerID, bookedDoctorId, comment } = req.body;
    // look for the patient and the doctorSchema in the database
    const patientID = await patientSchema.findById({ _id: bookerID });
    const doctorID = await doctorSchema.findOne({ _id: bookedDoctorId });
    // if the user is not found in the database
    if (!patientID || !doctorID) { 
        return res.status(400).json({message: "users not found"})
    }
    // if everything is ok
    const newBooking = await new bookingSchema({
      bookerID,
      bookedDoctorId,
      comment,
    }).save();

    // pushing the booking Id to the booking array in the patient schema
    const pushBooking = await patientSchema.findOneAndUpdate(
      { _id: bookerID },
      { $push: { bookings: newBooking._id} }
    );

    // if the booking was not created
    if (!newBooking) {
         return res.status(400).json({ message: "booking not created" });
    }
    // if everything is ok
     return res.status(200).json({ message: "booking created"});
}

// delete booking
export const deleteBooking = async (req, res) => { 
    const { id } = req.params
    // finding the booking in the database
    const { patientId } = req.body;
    const findBooking = await bookingSchema.findOne({ _id: id })
    // if the booking exist
    if (!findBooking) {
        return res.status(400).json({message: "booking not found"})
    }
    // if the booking was found
    const deleteBooking = await bookingSchema.findOneAndDelete({ _id: id })
    // if the it was successfull
    if (!deleteBooking) {
        return res.status(400).json({ message: "booking not deleted" });
    }

    // deletting the booking from the patient array
    const removeBooking = await patientSchema.findOneAndUpdate(
      { _id: patientId },
      {$pull: {bookings: id }}
    );
    if (!removeBooking) {
        return res.status(400).json({ message: "booking was not removed" });
    }
    // if everything ok
    return res.status(200).json({ message: "booking was deleted" });
};

// patient update booking
export const patientUpdateBooking = async (req, res) => {
    const { id } = req.params
    // getting the required parameters for the booking
    const { comment, bookerID } = req.body;
    // look for the patient and the doctorSchema in the database
    const patientID = await patientSchema.findById({ _id: bookerID });
    // if the user is not found in the database
    if (!patientID) {
        return res.status(400).json({ message: "users not found" })
    }

    // update the booking
    const updateBooking = await bookingSchema.findByIdAndUpdate({ _id: id }, { $set: { comment: comment } })
    // if it was not updated
    if (!updateBooking) {
        return res.status(400).json({ message: "booking not updated" });
    }
      // if everything as ok
      return res.status(200).json({message: "booking updated"});
};

// doctorSchema update booking
export const DoctorUpdateBooking = async (req, res) => {
    const { id } = req.params;
    // getting the required parameters for the booking
    const { DoctorId, isDeclined, isAccepted, isPending } = req.body;
    // look for the patient and the doctorSchema in the database
    const doctorID = await doctorSchema.findOne({ _id: DoctorId });
    // if the user is not found in the database
    if (!doctorID) {
      return res.status(400).json({ message: "users not found" });
    }
    // checking if the booking exist
    const bookingExist = await bookingSchema.findOne({ _id: id })
    if (!bookingExist) { 
        return res.status(400).json({ message: "booking not found" });
    }
    // update the booking
    const updateBooking = await bookingSchema.findOneAndUpdate(
      { _id: id },
      { $set: { isAccepted, isPending, isDeclined } }
    );
    // if it was not updated
    if (!updateBooking) {
      return res.status(400).json({ message: "booking not updated" });
    }
    // if everything as ok
    return res.status(200).json({ message: "booking updated" });
 };

// get all system bookings
export const allBooking = async (req, res) => {
    const allbooking = await bookingSchema
      .find()
        .populate(["bookerID", "bookedDoctorId"]);

    // sedning all booking in the system
    return res.status(200).json({ booking: allbooking })
 };

// get patient booking
export const patientBooking = async (req, res) => {
    // getting the patient ids
    const { id } = req.params;
    // finding the id in the database
    const findPatient = await patientSchema.findOne({ _id: id }).populate("bookings")
    // if the patient those not exist
    if (!findPatient) { 
        return res.status(400).json({message: "account not found"});
    }
    // sending the data
    return res.status(200).json({data: findPatient})
 };

// doctorSchema booking
export const doctorBooking = async (req, res) => {};