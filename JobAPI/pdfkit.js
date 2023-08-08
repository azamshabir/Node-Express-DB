const PDFDocument = require('pdfkit')
const fs = require('fs');

// https://stackabuse.com/generating-pdf-files-in-node-js-with-pdfkit/


const generatePdf = (jobDetails) => {

console.log('Job Details ===> '+jobDetails)
// Create a document
const doc = new PDFDocument();


const status = jobDetails.status;
const company = jobDetails.company;
const id = jobDetails._id;
const postion = jobDetails.position;
const createdBy = jobDetails.createdBy;
const approvedBy = jobDetails.ApprovedBy;
const approvedDate = jobDetails.ApprovedDate;
const approverComments = jobDetails.ApproverComments;
const contactNo = '+91-9999999999';
const contactEmail = 'sevis.manager@emai.com';


// Pipe its output somewhere, like to a file or HTTP response
doc.pipe(fs.createWriteStream('sreejith_'+id+'_output.pdf'));

doc.text('Form I-20',{ align: 'center', fillColor:'blue', fontSize:'25'})
doc.text('---------------------------------------------------------------------------------------------------------------------',{ align: 'center'})
doc.text('                                                                                    ')
doc.text('Status              : '+status, {align: 'left'})
doc.text('                                                                                    ')
doc.text('Acknowledgement Id  : '+id, {align: 'left'})
doc.text('                                                                                    ')
doc.text('Id                  : '+id, {align: 'left'})
doc.text('                                                                                    ')
doc.text('Company             : '+company, {align: 'left'})
doc.text('                                                                                    ')
doc.text('Postion             : '+postion, {align: 'left'})
doc.text('                                                                                    ')
doc.text('Created By          : '+createdBy, {align: 'left'})
doc.text('                                                                                    ')
doc.text('Approved By         : '+approvedBy, {align: 'left'})
doc.text('                                                                                    ')
doc.text('Approved Date       : '+approvedDate, {align: 'left'})
doc.text('                                                                                    ')
doc.text('Approver Comments   : '+approverComments, {align: 'left'})
doc.text('                                                                                    ')
doc.text('Contact No          : '+contactNo, {align: 'left'})
doc.text('                                                                                    ')
doc.text('Contact Email       : '+contactEmail, {align: 'left'})
doc.text('                                                                                    ')
//doc.text('SEZ, 1st & 4th floor, Campus 5B, RMZ Ecoworld, Outer Ring Rd, Devarabisanahalli, Marathahalli, Bengaluru, Karnataka 560103', {align: 'right'})
doc.end();
}

module.exports = { generatePdf }