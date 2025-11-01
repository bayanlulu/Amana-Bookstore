// src/app/data/reviews.ts
import { Review } from '../types';

export const reviews: Review[] = [
  // Reviews for Classical Mechanics (book-1)
  {
    id: 'review-1',
    bookId: '1',
    author: 'Dr. Yasmin Al-Baghdadi',
    rating: 5,
    title: 'Excellent foundation for physics students',
    comment: 'Dr. Al-Kindi has created a comprehensive introduction to classical mechanics. The mathematical derivations are clear and the problem sets are well-designed for understanding core principles.',
    timestamp: '2024-01-15T10:30:00Z',
    verified: true
  },
  {
    id: 'review-2',
    bookId: '1',
    author: 'Ahmad Khalil',
    rating: 4,
    title: 'Clear explanations of complex concepts',
    comment: 'The treatment of rotational dynamics and oscillations is particularly well done. Some sections could use more worked examples, but overall a solid textbook for undergraduate physics.',
    timestamp: '2024-02-03T14:22:00Z',
    verified: true
  },
  {
    id: 'review-3',
    bookId: '1',
    author: 'Prof. Layla Al-Masri',
    rating: 5,
    title: 'Perfect for engineering applications',
    comment: 'I use this textbook for my mechanics course. Students appreciate the real-world applications and the clear connection between theory and practice.',
    timestamp: '2024-02-20T09:15:00Z',
    verified: false
  },
  {
    id: 'review-4',
    bookId: '1',
    author: 'Omar Hassan',
    rating: 4,
    title: 'Good mathematical rigor',
    comment: 'The mathematical treatment is appropriate for upper-level undergraduates. The conservation laws chapter is particularly well-written.',
    timestamp: '2024-03-01T16:45:00Z',
    verified: true
  },
  {
    id: 'review-5',
    bookId: '1',
    author: 'Fatima Al-Zahra',
    rating: 5,
    title: 'Essential for physics majors',
    comment: 'Used this throughout my undergraduate studies. The progression from basic concepts to advanced topics is logical and well-paced.',
    timestamp: '2024-03-12T11:20:00Z',
    verified: true
  },

  // Reviews for Quantum Physics (book-2)
  {
    id: 'review-6',
    bookId: '2',
    author: 'Prof. Khalid Al-Razi',
    rating: 5,
    title: 'Outstanding quantum mechanics text',
    comment: 'Prof. Al-Haytham presents quantum mechanics with remarkable clarity. The treatment of wave functions and uncertainty principles is particularly insightful.',
    timestamp: '2024-01-08T13:30:00Z',
    verified: true
  },
  {
    id: 'review-7',
    bookId: '2',
    author: 'Zahra Mansour',
    rating: 4,
    title: 'Advanced but accessible',
    comment: 'Challenging material made accessible through excellent explanations. The applications to modern technology are fascinating and relevant.',
    timestamp: '2024-01-25T08:45:00Z',
    verified: true
  },
  {
    id: 'review-8',
    bookId: '2',
    author: 'Dr. Samir Al-Kindi',
    rating: 5,
    title: 'Comprehensive quantum theory',
    comment: 'This textbook covers everything from basic principles to advanced applications. The mathematical framework is presented with exceptional clarity.',
    timestamp: '2024-02-14T15:10:00Z',
    verified: false
  },
  {
    id: 'review-9',
    bookId: '2',
    author: 'Nadia Al-Sharif',
    rating: 4,
    title: 'Excellent for graduate students',
    comment: 'Dense material but well-organized. The quantum applications section provides valuable insight into current research directions.',
    timestamp: '2024-02-28T12:00:00Z',
    verified: true
  },
  {
    id: 'review-10',
    bookId: '2',
    author: 'Prof. Tariq Al-Dimashqi',
    rating: 5,
    title: 'Modern approach to quantum mechanics',
    comment: 'Bridges the gap between classical and quantum physics beautifully. Essential reading for anyone serious about quantum theory.',
    timestamp: '2024-03-05T17:30:00Z',
    verified: true
  },

  // Reviews for Stellar Astrophysics (book-3)
  {
    id: 'review-11',
    bookId: '3',
    author: 'Dr. Amina Al-Battani',
    rating: 5,
    title: 'Comprehensive stellar evolution coverage',
    comment: 'Dr. Al-Battani masterfully explains stellar formation, evolution, and death. The observational techniques section is particularly valuable.',
    timestamp: '2024-01-20T09:00:00Z',
    verified: true
  },
  {
    id: 'review-12',
    bookId: '3',
    author: 'Hassan Al-Shirazi',
    rating: 4,
    title: 'Great for astrophysics students',
    comment: 'Excellent treatment of galactic dynamics and cosmological structures. Some chapters are quite technical but rewarding for serious students.',
    timestamp: '2024-02-05T14:15:00Z',
    verified: true
  },
  {
    id: 'review-13',
    bookId: '3',
    author: 'Prof. Leila Al-Andalusi',
    rating: 4,
    title: 'Strong theoretical framework',
    comment: 'The theoretical foundations are solid and the connection to observational astronomy is well-made. Could use more recent discoveries.',
    timestamp: '2024-02-18T10:45:00Z',
    verified: false
  },
  {
    id: 'review-14',
    bookId: '3',
    author: 'Yusuf Al-Hakim',
    rating: 5,
    title: 'Excellent for research preparation',
    comment: 'This book prepared me well for graduate research in astrophysics. The mathematical treatment is rigorous yet accessible.',
    timestamp: '2024-03-02T16:20:00Z',
    verified: true
  },
  {
    id: 'review-15',
    bookId: '3',
    author: 'Dr. Mariam Al-Isfahani',
    rating: 4,
    title: 'Comprehensive galactic structure analysis',
    comment: 'Outstanding coverage of galactic dynamics. The stellar evolution chapters are particularly well-written and informative.',
    timestamp: '2024-03-15T13:30:00Z',
    verified: true
  },

  // Reviews for Planetary Sciences (book-4)
  {
    id: 'review-16',
    bookId: '4',
    author: 'Prof. Omar Al-Zarqali',
    rating: 5,
    title: 'Excellent planetary formation coverage',
    comment: 'Prof. Al-Zarqali provides comprehensive coverage of planetary formation and dynamics. The exoplanet section is particularly current and engaging.',
    timestamp: '2024-01-12T11:00:00Z',
    verified: true
  },
  {
    id: 'review-17',
    bookId: '4',
    author: 'Layla Al-Baghdadi',
    rating: 4,
    title: 'Great atmospheric dynamics section',
    comment: 'The atmospheric dynamics chapters are exceptional. Good balance between theoretical principles and observational data.',
    timestamp: '2024-01-28T15:45:00Z',
    verified: true
  },
  {
    id: 'review-18',
    bookId: '4',
    author: 'Dr. Khalil Al-Razi',
    rating: 5,
    title: 'Modern approach to planetary science',
    comment: 'Excellent integration of solar system and exoplanet studies. The comparative planetology approach is very effective.',
    timestamp: '2024-02-10T08:30:00Z',
    verified: false
  },
  {
    id: 'review-19',
    bookId: '4',
    author: 'Fatima Al-Kindi',
    rating: 4,
    title: 'Comprehensive but dense',
    comment: 'Covers a lot of ground in planetary sciences. Some sections are quite technical, but the content is thorough and up-to-date.',
    timestamp: '2024-02-25T12:15:00Z',
    verified: true
  },
  {
    id: 'review-20',
    bookId: '4',
    author: 'Prof. Ahmad Al-Mashriqiya',
    rating: 5,
    title: 'Essential for planetary studies',
    comment: 'This textbook is now a standard reference in our department. The treatment of both terrestrial and gas giant planets is excellent.',
    timestamp: '2024-03-08T14:00:00Z',
    verified: true
  },

  // Reviews for Islamic Architecture (book-5)
  {
    id: 'review-21',
    bookId: '5',
    author: 'Architect Zahra Al-Andalusi',
    rating: 5,
    title: 'Masterful analysis of Islamic geometry',
    comment: 'Al-Andalusi brilliantly explains the mathematical principles underlying Islamic architectural design. The geometric analysis is particularly insightful.',
    timestamp: '2024-01-05T10:20:00Z',
    verified: true
  },
  {
    id: 'review-22',
    bookId: '5',
    author: 'Prof. Hassan Al-Dimashqi',
    rating: 4,
    title: 'Excellent design principles',
    comment: 'Comprehensive coverage of Islamic architectural traditions. The contemporary applications section shows how classical principles remain relevant.',
    timestamp: '2024-01-22T16:30:00Z',
    verified: true
  },
  {
    id: 'review-23',
    bookId: '5',
    author: 'Leila Al-Muhandis',
    rating: 5,
    title: 'Essential for architecture students',
    comment: 'This book opened my eyes to the mathematical beauty of Islamic architecture. The geometric patterns are explained with remarkable clarity.',
    timestamp: '2024-02-07T09:45:00Z',
    verified: false
  },
  {
    id: 'review-24',
    bookId: '5',
    author: 'Dr. Yusuf Al-Baghdadi',
    rating: 4,
    title: 'Rich historical context',
    comment: 'Excellent historical context for understanding Islamic architectural development. The case studies of famous buildings are particularly valuable.',
    timestamp: '2024-02-21T13:10:00Z',
    verified: true
  },
  {
    id: 'review-25',
    bookId: '5',
    author: 'Mariam Al-Sharif',
    rating: 5,
    title: 'Beautiful integration of math and art',
    comment: 'Shows how mathematics and art come together in Islamic architecture. Essential reading for understanding cultural and technical aspects.',
    timestamp: '2024-03-10T11:25:00Z',
    verified: true
  },

  // Reviews for Sustainable Urban Planning (book-6)
  {
    id: 'review-26',
    bookId: '6',
    author: 'Dr. Tariq Al-Madani',
    rating: 5,
    title: 'Excellent green architecture principles',
    comment: 'Dr. Al-Dimashqi provides a comprehensive guide to sustainable urban development. The green building technologies section is particularly valuable.',
    timestamp: '2024-01-18T14:40:00Z',
    verified: true
  },
  {
    id: 'review-27',
    bookId: '6',
    author: 'Amina Al-Karkhi',
    rating: 4,
    title: 'Practical sustainability approaches',
    comment: 'Good balance between theoretical principles and practical applications. The case studies of sustainable cities are inspiring.',
    timestamp: '2024-02-01T10:15:00Z',
    verified: true
  },
  {
    id: 'review-28',
    bookId: '6',
    author: 'Prof. Khalid Al-Andalusi',
    rating: 4,
    title: 'Modern urban planning concepts',
    comment: 'Addresses current challenges in urban development with innovative solutions. The environmental impact assessment chapter is excellent.',
    timestamp: '2024-02-16T15:50:00Z',
    verified: false
  },
  {
    id: 'review-29',
    bookId: '6',
    author: 'Layla Al-Zahra',
    rating: 5,
    title: 'Essential for urban planners',
    comment: 'This book should be required reading for all urban planning students. The sustainable design principles are clearly explained and actionable.',
    timestamp: '2024-03-01T08:20:00Z',
    verified: true
  },
  {
    id: 'review-30',
    bookId: '6',
    author: 'Dr. Omar Al-Turani',
    rating: 4,
    title: 'Comprehensive green technology coverage',
    comment: 'Excellent coverage of green building technologies and sustainable infrastructure. The future cities section is particularly thought-provoking.',
    timestamp: '2024-03-14T12:35:00Z',
    verified: true
  },

  // Reviews for Advanced Calculus (book-7)
  {
    id: 'review-31',
    bookId: '7',
    author: 'Prof. Fatima Al-Jabir',
    rating: 5,
    title: 'Rigorous mathematical analysis',
    comment: 'Prof. Al-Jabir presents advanced calculus with exceptional rigor. The real analysis sections are particularly well-developed.',
    timestamp: '2024-01-10T13:25:00Z',
    verified: true
  },
  {
    id: 'review-32',
    bookId: '7',
    author: 'Ahmad Al-Khwarizmi',
    rating: 4,
    title: 'Excellent for engineering applications',
    comment: 'Strong mathematical foundation with good engineering applications. The multivariable calculus treatment is comprehensive.',
    timestamp: '2024-01-30T09:40:00Z',
    verified: true
  },
  {
    id: 'review-33',
    bookId: '7',
    author: 'Dr. Zahra Al-Razi',
    rating: 4,
    title: 'Challenging but rewarding',
    comment: 'Dense mathematical content but excellent pedagogical approach. The problem sets are challenging and well-designed.',
    timestamp: '2024-02-12T16:10:00Z',
    verified: false
  },
  {
    id: 'review-34',
    bookId: '7',
    author: 'Hassan Al-Biruni',
    rating: 5,
    title: 'Outstanding mathematical techniques',
    comment: 'The advanced mathematical techniques are presented clearly. Essential for physics and engineering students.',
    timestamp: '2024-02-26T11:55:00Z',
    verified: true
  },
  {
    id: 'review-35',
    bookId: '7',
    author: 'Prof. Nadia Al-Isfahani',
    rating: 4,
    title: 'Solid theoretical foundation',
    comment: 'Provides excellent theoretical foundation for advanced mathematics. The proof techniques are particularly well-explained.',
    timestamp: '2024-03-11T14:20:00Z',
    verified: true
  },

  // Reviews for Linear Algebra (book-8)
  {
    id: 'review-36',
    bookId: '8',
    author: 'Dr. Yusuf Al-Qurra',
    rating: 5,
    title: 'Excellent vector space treatment',
    comment: 'Dr. Al-Isfahani presents linear algebra concepts with remarkable clarity. The vector space and linear transformation chapters are outstanding.',
    timestamp: '2024-01-14T10:05:00Z',
    verified: true
  },
  {
    id: 'review-37',
    bookId: '8',
    author: 'Layla Al-Baghdadi',
    rating: 4,
    title: 'Great for computer science applications',
    comment: 'Strong emphasis on computational applications. The eigenvalue sections are particularly well-done for CS students.',
    timestamp: '2024-02-04T15:30:00Z',
    verified: true
  },
  {
    id: 'review-38',
    bookId: '8',
    author: 'Prof. Khalil Al-Shirazi',
    rating: 5,
    title: 'Perfect balance of theory and practice',
    comment: 'Excellent balance between theoretical rigor and practical applications. The matrix theory chapters are exceptionally clear.',
    timestamp: '2024-02-19T12:45:00Z',
    verified: false
  },
  {
    id: 'review-39',
    bookId: '8',
    author: 'Omar Al-Masri',
    rating: 4,
    title: 'Comprehensive linear algebra coverage',
    comment: 'Covers all essential topics in linear algebra. The engineering applications make abstract concepts more concrete.',
    timestamp: '2024-03-03T09:15:00Z',
    verified: true
  },
  {
    id: 'review-40',
    bookId: '8',
    author: 'Dr. Amina Al-Kindi',
    rating: 5,
    title: 'Essential for STEM students',
    comment: 'This textbook is now our standard reference for linear algebra. The progression from basic concepts to advanced topics is perfect.',
    timestamp: '2024-03-16T16:40:00Z',
    verified: true
  },

  // Reviews for Molecular Biology (book-9)
  {
    id: 'review-41',
    bookId: '9',
    author: 'Prof. Zahra Al-Zahrawi',
    rating: 5,
    title: 'Cutting-edge molecular biology',
    comment: 'Prof. Al-Razi presents modern molecular biology with exceptional depth. The genetic engineering sections are particularly current and relevant.',
    timestamp: '2024-01-12T11:15:00Z',
    verified: true
  },
  {
    id: 'review-42',
    bookId: '9',
    author: 'Dr. Hassan Al-Tabari',
    rating: 4,
    title: 'Excellent biotechnology applications',
    comment: 'Strong coverage of DNA technology and protein synthesis. The biotechnology applications are fascinating and well-explained.',
    timestamp: '2024-02-08T14:30:00Z',
    verified: true
  },
  {
    id: 'review-43',
    bookId: '9',
    author: 'Fatima Al-Razi',
    rating: 5,
    title: 'Comprehensive molecular techniques',
    comment: 'Outstanding coverage of modern molecular biology techniques. Essential for anyone working in biotechnology or medicine.',
    timestamp: '2024-02-22T09:20:00Z',
    verified: false
  },
  {
    id: 'review-44',
    bookId: '9',
    author: 'Dr. Ahmad Al-Biruni',
    rating: 4,
    title: 'Advanced but accessible',
    comment: 'Complex material presented in an accessible way. The medical applications sections are particularly valuable.',
    timestamp: '2024-03-05T16:45:00Z',
    verified: true
  },
  {
    id: 'review-45',
    bookId: '9',
    author: 'Prof. Leila Al-Kindi',
    rating: 5,
    title: 'Modern genetic engineering focus',
    comment: 'Excellent integration of classical molecular biology with modern genetic engineering. Perfect for graduate students.',
    timestamp: '2024-03-18T13:10:00Z',
    verified: true
  },

  // Reviews for Ecology (book-10)
  {
    id: 'review-46',
    bookId: '10',
    author: 'Dr. Yusuf Al-Jahiz',
    rating: 5,
    title: 'Comprehensive ecological principles',
    comment: 'Dr. Al-Baghdadi masterfully explains ecological principles and their applications. The conservation sections are particularly timely.',
    timestamp: '2024-01-25T10:40:00Z',
    verified: true
  },
  {
    id: 'review-47',
    bookId: '10',
    author: 'Amina Al-Mashriqiya',
    rating: 4,
    title: 'Excellent environmental focus',
    comment: 'Strong emphasis on environmental conservation and biodiversity. The population dynamics chapters are well-written.',
    timestamp: '2024-02-14T15:20:00Z',
    verified: true
  },
  {
    id: 'review-48',
    bookId: '10',
    author: 'Prof. Khalid Al-Andalusi',
    rating: 4,
    title: 'Good balance of theory and application',
    comment: 'Excellent balance between ecological theory and practical conservation applications. The case studies are particularly valuable.',
    timestamp: '2024-02-28T12:35:00Z',
    verified: false
  },
  {
    id: 'review-49',
    bookId: '10',
    author: 'Zahra Al-Dimashqi',
    rating: 5,
    title: 'Essential for environmental science',
    comment: 'This textbook covers all essential topics in ecology and environmental biology. Perfect for undergraduate environmental science courses.',
    timestamp: '2024-03-12T09:50:00Z',
    verified: true
  },
  {
    id: 'review-50',
    bookId: '10',
    author: 'Dr. Omar Al-Karkhi',
    rating: 4,
    title: 'Strong conservation emphasis',
    comment: 'Excellent coverage of conservation biology and environmental impact assessment. Current and relevant to today\'s environmental challenges.',
    timestamp: '2024-03-20T14:25:00Z',
    verified: true
  },

  // Additional reviews for remaining books (11-15) following the same pattern...
  // Reviews for Organic Chemistry (book-11)
  {
    id: 'review-51',
    bookId: '11',
    author: 'Prof. Nadia Al-Kindi',
    rating: 5,
    title: 'Outstanding reaction mechanisms',
    comment: 'Prof. Al-Dimashqi presents organic chemistry with exceptional clarity. The reaction mechanism sections are particularly well-explained.',
    timestamp: '2024-02-05T11:30:00Z',
    verified: true
  },
  {
    id: 'review-52',
    bookId: '11',
    author: 'Hassan Al-Shirazi',
    rating: 4,
    title: 'Excellent synthesis strategies',
    comment: 'Comprehensive coverage of synthesis strategies and spectroscopic analysis. Great resource for organic chemistry students.',
    timestamp: '2024-02-18T16:15:00Z',
    verified: true
  },

  // Reviews for Physical Chemistry (book-12)
  {
    id: 'review-53',
    bookId: '12',
    author: 'Dr. Ahmad Ibn Hayyan',
    rating: 5,
    title: 'Exceptional thermodynamics treatment',
    comment: 'Dr. Al-Turani provides excellent coverage of thermodynamics and kinetics. The quantum chemistry sections are particularly strong.',
    timestamp: '2024-01-30T14:20:00Z',
    verified: true
  },
  {
    id: 'review-54',
    bookId: '12',
    author: 'Fatima Al-Razi',
    rating: 4,
    title: 'Advanced physical chemistry concepts',
    comment: 'Rigorous treatment of physical chemistry principles. The statistical mechanics chapter is excellent.',
    timestamp: '2024-02-25T10:45:00Z',
    verified: true
  },

  // Reviews for Algorithms (book-13)
  {
    id: 'review-55',
    bookId: '13',
    author: 'Prof. Layla Al-Khwarizmi',
    rating: 5,
    title: 'Excellent algorithmic foundations',
    comment: 'Prof. Al-Jazari presents algorithms and data structures with remarkable clarity. Essential for computer science students.',
    timestamp: '2024-02-10T13:40:00Z',
    verified: true
  },
  {
    id: 'review-56',
    bookId: '13',
    author: 'Omar Al-Kindi',
    rating: 4,
    title: 'Comprehensive complexity analysis',
    comment: 'Outstanding coverage of algorithm complexity and computational problem-solving. The programming examples are well-chosen.',
    timestamp: '2024-03-01T15:30:00Z',
    verified: true
  },

  // Reviews for Engineering Thermodynamics (book-14)
  {
    id: 'review-57',
    bookId: '14',
    author: 'Dr. Zahra Al-Muhandis',
    rating: 5,
    title: 'Excellent engineering applications',
    comment: 'Dr. Al-Karkhi provides excellent coverage of thermodynamics with strong engineering focus. The heat transfer sections are particularly valuable.',
    timestamp: '2024-01-20T12:10:00Z',
    verified: true
  },
  {
    id: 'review-58',
    bookId: '14',
    author: 'Ahmad Al-Baghdadi',
    rating: 4,
    title: 'Comprehensive energy systems coverage',
    comment: 'Solid coverage of energy conversion systems and heat transfer mechanisms. Good balance of theory and practical applications.',
    timestamp: '2024-02-28T09:25:00Z',
    verified: true
  },

  // Reviews for Geophysics (book-15)
  {
    id: 'review-59',
    bookId: '15',
    author: 'Prof. Hassan Al-Biruni',
    rating: 5,
    title: 'Outstanding Earth science coverage',
    comment: 'Prof. Al-Mashriqiya provides comprehensive coverage of Earth\'s physical processes. The seismology sections are particularly excellent.',
    timestamp: '2024-02-15T14:50:00Z',
    verified: true
  },
  {
    id: 'review-60',
    bookId: '15',
    author: 'Dr. Amina Al-Andalusi',
    rating: 4,
    title: 'Excellent climate science integration',
    comment: 'Great integration of geophysics with climate science. The plate tectonics chapters are well-written and current.',
    timestamp: '2024-03-08T11:40:00Z',
    verified: true
  }
];