import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { fileName } = await request.json();

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock course matches for demo - Full dataset with 24 courses (125 credits attempted)
    const directTransfers = [
      {
        originalCode: "SOC& 101",
        originalTitle: "Introduction to Sociology",
        originalInstitution: "Bellevue College",
        uwCode: "SOC 110",
        uwTitle: "Survey of Sociology",
        credits: 5,
        description: "Direct transfer. Satisfies I&S general education requirement",
        tags: ["SSc"],
        matchType: "exact"
      },
      {
        originalCode: "CHIN& 122",
        originalTitle: "Chinese II",
        originalInstitution: "Bellevue College",
        uwCode: "CHIN 102",
        uwTitle: "First-Year Chinese",
        credits: 5,
        description: "Direct transfer. Satisfies language requirement",
        tags: ["VLPA"],
        matchType: "exact"
      },
      {
        originalCode: "CS 210",
        originalTitle: "Fundamentals of CS I",
        originalInstitution: "Bellevue College",
        uwCode: "CSE 142",
        uwTitle: "Computer Programming I",
        credits: 4,
        description: "Direct transfer. Core CSE prerequisite",
        tags: ["NW"],
        matchType: "exact"
      },
      {
        originalCode: "ENGL& 101",
        originalTitle: "English Composition I",
        originalInstitution: "Bellevue College",
        uwCode: "ENGL 111",
        uwTitle: "Composition: Literature",
        credits: 5,
        description: "Direct transfer. Satisfies composition requirement",
        tags: ["C"],
        matchType: "exact"
      },
      {
        originalCode: "MATH& 151",
        originalTitle: "Calculus I",
        originalInstitution: "Bellevue College",
        uwCode: "MATH 124",
        uwTitle: "Calculus with Analytic Geometry I",
        credits: 5,
        description: "Direct transfer. Core math requirement for CSE",
        tags: ["NW"],
        matchType: "exact"
      },
      {
        originalCode: "CS 211",
        originalTitle: "Fundamentals of CS II",
        originalInstitution: "Bellevue College",
        uwCode: "CSE 143",
        uwTitle: "Computer Programming II",
        credits: 5,
        description: "Direct transfer. Core CSE prerequisite",
        tags: ["NW"],
        matchType: "exact"
      },
      {
        originalCode: "MATH& 152",
        originalTitle: "Calculus II",
        originalInstitution: "Bellevue College",
        uwCode: "MATH 125",
        uwTitle: "Calculus with Analytic Geometry II",
        credits: 5,
        description: "Direct transfer. Core math requirement",
        tags: ["NW"],
        matchType: "exact"
      },
      {
        originalCode: "MATH 208",
        originalTitle: "Introduction to Linear Algebra",
        originalInstitution: "Bellevue College",
        uwCode: "MATH 208",
        uwTitle: "Matrix Algebra with Applications",
        credits: 5,
        description: "Direct transfer. Required for CSE majors",
        tags: ["NW"],
        matchType: "exact"
      },
      {
        originalCode: "MATH& 153",
        originalTitle: "Calculus III",
        originalInstitution: "Bellevue College",
        uwCode: "MATH 126",
        uwTitle: "Calculus with Analytic Geometry III",
        credits: 5,
        description: "Direct transfer. Core math requirement",
        tags: ["NW"],
        matchType: "exact"
      },
      {
        originalCode: "PHYS 121",
        originalTitle: "General Engineering Physics I",
        originalInstitution: "Bellevue College",
        uwCode: "PHYS 121",
        uwTitle: "Mechanics",
        credits: 5,
        description: "Direct transfer. Required physics sequence for engineering",
        tags: ["NW"],
        matchType: "exact"
      },
      {
        originalCode: "PHYS 122",
        originalTitle: "General Engineering Physics II",
        originalInstitution: "Bellevue College",
        uwCode: "PHYS 122",
        uwTitle: "Electromagnetism",
        credits: 5,
        description: "Direct transfer. Required physics sequence",
        tags: ["NW"],
        matchType: "exact"
      },
      {
        originalCode: "CHEM& 161",
        originalTitle: "General Chemistry I",
        originalInstitution: "Bellevue College",
        uwCode: "CHEM 142",
        uwTitle: "General Chemistry",
        credits: 5,
        description: "Direct transfer. Satisfies science requirement",
        tags: ["NW"],
        matchType: "exact"
      },
      {
        originalCode: "MATH 238",
        originalTitle: "Differential Equations",
        originalInstitution: "Bellevue College",
        uwCode: "MATH 307",
        uwTitle: "Introduction to Differential Equations",
        credits: 3,
        description: "Direct transfer. Important for engineering and CS applications",
        tags: ["NW"],
        matchType: "exact"
      },
      {
        originalCode: "PHIL& 101",
        originalTitle: "Introduction to Philosophy",
        originalInstitution: "Bellevue College",
        uwCode: "PHIL 100",
        uwTitle: "Introduction to Philosophy",
        credits: 5,
        description: "Direct transfer. Satisfies VLPA general education requirement",
        tags: ["VLPA"],
        matchType: "exact"
      },
      {
        originalCode: "PHYS 123",
        originalTitle: "General Engineerin Physics III",
        originalInstitution: "Bellevue College",
        uwCode: "PHYS 123",
        uwTitle: "Waves",
        credits: 5,
        description: "Direct transfer. Completes physics sequence",
        tags: ["NW"],
        matchType: "exact"
      }
    ];

    const semanticMatches = [
      {
        originalCode: "BA 240",
        originalTitle: "Statistical Analysis",
        originalInstitution: "Bellevue College",
        uwCode: "STAT 311",
        uwTitle: "Elements of Statistical Methods",
        credits: 5,
        description: "Similar statistical content and learning outcomes",
        tags: ["NW"],
        matchType: "semantic"
      },
      {
        originalCode: "MATH& 254",
        originalTitle: "Calculus IV",
        originalInstitution: "Bellevue College",
        uwCode: "MATH 224",
        uwTitle: "Advanced Multivariable Calculus",
        credits: 5,
        description: "Advanced calculus topics align with UW curriculum",
        tags: ["NW"],
        matchType: "semantic"
      },
      {
        originalCode: "CS 212",
        originalTitle: "C++ Data Structures",
        originalInstitution: "Bellevue College",
        uwCode: "CSE 373",
        uwTitle: "Data Structures and Algorithms",
        credits: 4,
        description: "Data structures content aligns well with CSE 373 curriculum",
        tags: ["NW"],
        matchType: "semantic"
      }
    ];

    const electiveCredits = [
      {
        originalCode: "BUS& 101",
        originalTitle: "Introduction to Business",
        originalInstitution: "Bellevue College",
        uwCode: "B BUS 1XX",
        uwTitle: "Elective Credit",
        credits: 5,
        description: "Counts as general elective credit",
        tags: ["Elective"],
        matchType: "elective"
      },
      {
        originalCode: "CES 201",
        originalTitle: "Sports, Narrative, Identity",
        originalInstitution: "Bellevue College",
        uwCode: "VLPA/SSc 1XX",
        uwTitle: "Elective Credit",
        credits: 5,
        description: "May satisfy I&S or VLPA general education requirement",
        tags: ["VLPA or SSc"],
        matchType: "elective"
      },
      {
        originalCode: "HD 103",
        originalTitle: "Intl Student 1st Year Experien",
        originalInstitution: "Bellevue College",
        uwCode: "GENST 1XX",
        uwTitle: "Elective Credit",
        credits: 3,
        description: "General elective credit",
        tags: ["Elective"],
        matchType: "elective"
      },
      {
        originalCode: "ENGL 201",
        originalTitle: "The Research Paper",
        originalInstitution: "Bellevue College",
        uwCode: "ENGL 2XX",
        uwTitle: "Elective Credit",
        credits: 5,
        description: "General elective credit",
        tags: ["Elective"],
        matchType: "elective"
      },
      {
        originalCode: "ART 154",
        originalTitle: "Introduction to Digital Photo",
        originalInstitution: "Bellevue College",
        uwCode: "ART 1XX",
        uwTitle: "Elective Credit",
        credits: 5,
        description: "May satisfy VLPA general education requirement",
        tags: ["VLPA"],
        matchType: "elective"
      }
    ];

    const needsReview = [
      {
        originalCode: "MATH 255",
        originalTitle: "Vector Calculus",
        originalInstitution: "Bellevue College",
        uwCode: "MATH 2XX",
        uwTitle: "Elective Credit",
        credits: 5,
        description: "Requires advisor review for specific equivalency determination",
        tags: ["Mathematics"],
        matchType: "review"
      }
    ];

    // Calculate credits for each category
    const directCredits = directTransfers.reduce((sum: number, c: any) => sum + c.credits, 0);
    const semanticCredits = semanticMatches.reduce((sum: number, c: any) => sum + c.credits, 0);
    const electiveCreditsTotal = electiveCredits.reduce((sum: number, c: any) => sum + c.credits, 0);
    const reviewCredits = needsReview.reduce((sum: number, c: any) => sum + c.credits, 0);

    // Total credits attempted (before cap)
    const totalCreditsAttempted = directCredits + semanticCredits + electiveCreditsTotal + reviewCredits;

    // Apply 90-credit transfer cap
    const totalCreditsTransferred = Math.min(totalCreditsAttempted, 90);

    return NextResponse.json({
      success: true,
      directTransfers: [...directTransfers, ...semanticMatches, ...electiveCredits],
      needsReview,
      summary: {
        totalCredits: totalCreditsTransferred,
        directTransferCredits: directCredits,
        needsReviewCredits: reviewCredits,
        totalCreditsAttempted: totalCreditsAttempted,
        transferCapApplied: totalCreditsAttempted > 90
      }
    });
  } catch (error) {
    console.error('Error matching courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to match courses' },
      { status: 500 }
    );
  }
}
