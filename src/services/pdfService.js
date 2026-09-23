import { jsPDF } from 'jspdf';

/**
 * Generate and download official Blood Donation Certificate PDF using jsPDF
 */
export function generateDonationCertificatePDF(donationData, donorData) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const certId = donationData.certificateId || `CERT-${Date.now().toString().slice(-6)}`;
  const donorName = donorData.name || donationData.donorName || 'Jane Doe';
  const bloodGroup = donationData.bloodGroup || donorData.bloodGroup || 'O+';
  const donationDate = donationData.donationDate || new Date().toISOString().split('T')[0];
  const bankName = donationData.bloodBankName || 'City Central Blood Bank';

  // Page Dimensions: 297mm x 210mm
  // 1. Certificate Outer Border
  doc.setDrawColor(168, 11, 24); // Dark Red Primary
  doc.setLineWidth(3);
  doc.rect(10, 10, 277, 190);

  doc.setDrawColor(217, 119, 6); // Gold Inner Accent Border
  doc.setLineWidth(1);
  doc.rect(14, 14, 269, 182);

  // 2. Header Emblem & Title
  doc.setFillColor(168, 11, 24);
  doc.rect(14, 14, 269, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('BLOOD TRUST NATIONAL NETWORK', 148, 30, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICIAL CERTIFICATE OF VOLUNTARY BLOOD DONATION', 148, 37, { align: 'center' });

  // 3. Certificate Serial No
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Certificate No: ${certId}`, 275, 50, { align: 'right' });

  // 4. Main Body Text
  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.text('This is to proudly certify that', 148, 65, { align: 'center' });

  // Donor Name Highlight
  doc.setTextColor(168, 11, 24);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text(donorName.toUpperCase(), 148, 80, { align: 'center' });

  // Recognition Paragraph
  doc.setTextColor(50, 50, 50);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  const paragraph = `has generously donated 1 Unit of ${donationData.component || 'RBC'} (${bloodGroup}) Blood on ${donationDate} at ${bankName}.`;
  doc.text(paragraph, 148, 98, { align: 'center' });

  doc.setFontSize(11);
  doc.text('This noble act of voluntary blood donation helps save up to three human lives.', 148, 108, { align: 'center' });

  // 5. Details Table Box
  doc.setFillColor(248, 249, 250);
  doc.rect(40, 120, 217, 30, 'F');
  doc.setDrawColor(220, 220, 220);
  doc.rect(40, 120, 217, 30, 'S');

  doc.setTextColor(80, 80, 80);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Donor ID: ${donorData.donorId || 'BT-DONOR-88219'}`, 55, 132);
  doc.text(`Blood Group: ${bloodGroup}`, 130, 132);
  doc.text(`Donation Date: ${donationDate}`, 200, 132);

  doc.text(`Facility: ${bankName}`, 55, 142);
  doc.text(`Component: ${donationData.component || 'RBC'}`, 130, 142);
  doc.text(`Status: Verified & Processed`, 200, 142);

  // 6. Signatures & Official Seal
  doc.setDrawColor(150, 150, 150);
  doc.line(45, 175, 105, 175);
  doc.line(192, 175, 252, 175);

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Medical Officer Signature', 75, 181, { align: 'center' });
  doc.text('Director, Blood Trust Network', 222, 181, { align: 'center' });

  // Official Stamp Circle
  doc.setDrawColor(168, 11, 24);
  doc.setFillColor(254, 242, 242);
  doc.circle(148, 168, 14, 'FD');
  doc.setTextColor(168, 11, 24);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('VERIFIED', 148, 166, { align: 'center' });
  doc.text('DONATION', 148, 171, { align: 'center' });

  // 7. Save / Trigger Download
  doc.save(`Blood_Trust_Certificate_${certId}.pdf`);
}
