export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  price: number;
  category: string;
  youtubeId: string;
  description: string;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Angela Yu',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    price: 499,
    category: 'Fullstack',
    youtubeId: 'l1EssrLxt7E',
    description: 'Learn to build full-stack web applications from scratch using HTML, CSS, JavaScript, React, and Node.js.'
  },
  {
    id: '2',
    title: 'Python for Data Science',
    instructor: 'Jose Portilla',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    price: 399,
    category: 'Python',
    youtubeId: 'rfscVS0vtbw',
    description: 'Master Python programming and its application in data analysis, visualization, and machine learning.'
  },
  {
    id: '3',
    title: 'Java Masterclass for Beginners',
    instructor: 'Tim Buchalka',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    price: 449,
    category: 'Java',
    youtubeId: 'grEKMHGYuko',
    description: 'A comprehensive guide to Java programming, covering everything from basics to advanced topics like multithreading.'
  },
  {
    id: '4',
    title: 'Data Structures & Algorithms',
    instructor: 'Abdul Bari',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
    price: 599,
    category: 'DSA',
    youtubeId: '0IAPZzGSbME',
    description: 'Deep dive into DSA to crack top product-based company interviews with ease.'
  },
  {
    id: '5',
    title: 'SQL & Database Design',
    instructor: 'Colt Steele',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
    price: 299,
    category: 'SQL',
    youtubeId: 'HXV3zeQKqGY',
    description: 'Learn SQL from scratch and master database design using MySQL and PostgreSQL.'
  },
  {
    id: '6',
    title: 'Mastering C Programming',
    instructor: 'Dennis Ritchie Jr.',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
    price: 349,
    category: 'C',
    youtubeId: 'irqbmMNs2Bo',
    description: 'Foundation course for every programmer. Learn memory management, pointers, and performance coding.'
  },
  {
    id: '7',
    title: 'C++ from Beginner to Expert',
    instructor: 'Bjarne Stroustrup Fan',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    price: 399,
    category: 'C++',
    youtubeId: 'vLnPwxZdW4Y',
    description: 'Master Object-Oriented Programming with C++ and build high-performance applications.'
  },
  {
    id: '8',
    title: 'HTML5 & CSS3: The Complete Guide',
    instructor: 'Jonas Schmedtmann',
    thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
    price: 199,
    category: 'Design',
    youtubeId: 'mU6anWqZJcc',
    description: 'Design beautiful, responsive websites from scratch using the latest web standards.'
  },
  {
    id: '9',
    title: 'Machine Learning A-Z',
    instructor: 'Kirill Eremenko',
    thumbnail: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80',
    price: 699,
    category: 'ML/AI',
    youtubeId: 'GwIo3gDZCVQ',
    description: 'Learn to build Machine Learning Models with Python and R. Includes hands-on projects.'
  },
  {
    id: '10',
    title: 'Deep Learning Specialization',
    instructor: 'Andrew Ng',
    thumbnail: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&q=80',
    price: 799,
    category: 'ML/AI',
    youtubeId: 'aircAruvnKk',
    description: 'Master Deep Learning to build AI. Covering Neural Networks, CNNs, RNNs, and more.'
  },
  {
    id: '11',
    title: 'Advanced Data Structures',
    instructor: 'William Fiset',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    price: 499,
    category: 'DSA',
    youtubeId: 'RBSGKlAvoiM',
    description: 'Explore complex data structures like SegTree, Fenwick Tree, and Graph Algorithms in depth.'
  },
  {
    id: '12',
    title: 'JavaScript: The Hard Parts',
    instructor: 'Will Sentance',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80',
    price: 449,
    category: 'JavaScript',
    youtubeId: 'h8K49zZohYI',
    description: 'Master closures, scope, and asynchronous JavaScript for true technical excellence.'
  },
  {
    id: '13',
    title: 'Fullstack React & Node.js',
    instructor: 'Maximilian Schwarzmüller',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    price: 549,
    category: 'Fullstack',
    youtubeId: '0ZJgJw71A8g',
    description: 'Build robust, scalable MERN stack applications with industry standard practices.'
  },
  {
    id: '14',
    title: 'Artificial Intelligence Foundations',
    instructor: 'Kai-Fu Lee',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    price: 649,
    category: 'ML/AI',
    youtubeId: '5TdH3b-J7Gg',
    description: 'A conceptual journey through AI history, current state, and future possibilities.'
  }
];
