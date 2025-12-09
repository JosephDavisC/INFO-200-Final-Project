import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Course {
  originalCode: string;
  originalTitle: string;
  originalInstitution: string;
  uwCode: string;
  uwTitle: string;
  credits: number;
  description: string;
  tags: string[];
}

interface UserData {
  fullName?: string;
  email?: string;
  institution?: string;
  major?: string;
  graduationYear?: string;
}

interface SummaryData {
  totalCredits: number;
  directTransferCredits: number;
  needsReviewCredits: number;
  totalCreditsAttempted?: number;
}

export function generateTransferEvaluationPDF(
  user: UserData | null,
  directTransfers: Course[],
  needsReview: Course[],
  summary: SummaryData
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;

  // UW Purple color
  const uwPurple = [76, 49, 130];
  const uwGold = [183, 165, 125];

  // Title
  doc.setFillColor(uwPurple[0], uwPurple[1], uwPurple[2]);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Transfer Evaluation Report', pageWidth / 2, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('University of Washington', pageWidth / 2, 30, { align: 'center' });

  yPos = 50;

  // Student Information Section
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Student Information', 14, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const studentInfo = [
    ['Name:', user?.fullName || 'N/A'],
    ['Email:', user?.email || 'N/A'],
    ['Previous Institution:', user?.institution || 'N/A'],
    ['Intended Major:', user?.major ? `B.S. ${user.major}` : 'N/A'],
    ['Expected Graduation:', user?.graduationYear ? `Spring ${user.graduationYear}` : 'N/A'],
  ];

  studentInfo.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, 14, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 60, yPos);
    yPos += 6;
  });

  yPos += 10;

  // Summary Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Credit Summary', 14, yPos);
  yPos += 10;

  // Summary boxes
  const summaryData = [
    ['Total Credits Attempted', summary.totalCreditsAttempted?.toString() || summary.totalCredits.toString()],
    ['Transferable Credits', `${summary.totalCredits} (90 credit max)`],
    ['Direct Transfer Credits', summary.directTransferCredits.toString()],
    ['Needs Review Credits', summary.needsReviewCredits.toString()],
  ];

  autoTable(doc, {
    startY: yPos,
    head: [['Category', 'Credits']],
    body: summaryData,
    theme: 'striped',
    headStyles: {
      fillColor: uwPurple as [number, number, number],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    margin: { left: 14, right: 14 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Direct Transfer Courses
  if (directTransfers.length > 0) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Direct Transfer Courses (${directTransfers.length} courses)`, 14, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('These courses have a direct equivalent at the UW, and will transfer automatically.', 14, yPos);
    yPos += 10;

    const directTransferData = directTransfers.map((course) => [
      `${course.originalCode}\n${course.originalTitle}`,
      '→',
      `${course.uwCode}\n${course.uwTitle}`,
      `${course.credits} cr`,
      course.tags.join(', ') || '-',
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Original Course', '', 'UW Equivalent', 'Credits', 'Requirements']],
      body: directTransferData,
      theme: 'striped',
      headStyles: {
        fillColor: [34, 139, 34] as [number, number, number],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 10, halign: 'center' },
        2: { cellWidth: 50 },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 'auto' },
      },
      margin: { left: 14, right: 14 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;
  }

  // Check if we need a new page
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  // Needs Review Courses
  if (needsReview.length > 0) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Needs Review (${needsReview.length} courses)`, 14, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('These courses require advisor review for equivalency determination.', 14, yPos);
    yPos += 10;

    const needsReviewData = needsReview.map((course) => [
      `${course.originalCode}\n${course.originalTitle}`,
      '→',
      `${course.uwCode}\n${course.uwTitle}`,
      `${course.credits} cr`,
      course.description,
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Original Course', '', 'UW Equivalent', 'Credits', 'Notes']],
      body: needsReviewData,
      theme: 'striped',
      headStyles: {
        fillColor: [220, 38, 38] as [number, number, number],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 45 },
        1: { cellWidth: 10, halign: 'center' },
        2: { cellWidth: 45 },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 'auto' },
      },
      margin: { left: 14, right: 14 },
    });
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Generated by UW Transfer Evaluation Tool - Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(date, 14, doc.internal.pageSize.height - 10);
  }

  // Save the PDF
  const fileName = `UW_Transfer_Evaluation_${user?.fullName?.replace(/\s+/g, '_') || 'Report'}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}
