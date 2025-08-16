export const formatDate = date => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTime = date => {
  const now = new Date();
  const diff = now - date;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString([], {weekday: 'short'});
  } else {
    return date.toLocaleDateString([], {month: 'short', day: 'numeric'});
  }
};

export const users = [
  {
    id: '1',
    name: 'Sarah Khan',
    message: 'Hey! How are you?',
    image:
      'https://media.istockphoto.com/id/1265568493/photo/north-african-businessman-giving-a-whiteboard-presentation-to-office-c.jpg?s=612x612&w=0&k=20&c=zaiSnUYmA70MiQNQnMXpsZ3UleYjdVpeKR4AZ5SnAJM=',
    timeAgo: '2 min',
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Ali Raza',
    message: 'I’ll send the report today.',
    image:
      'https://media.istockphoto.com/id/517302398/photo/portrait-of-nigerian-man-with-beard-looking-at-camera.jpg?s=612x612&w=0&k=20&c=BC5pdsmTWzmFO3mIlA7TQAIECnJ7Kpd-daL6G4RJqT4=',
    timeAgo: '10 min',
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Maria Sheikh',
    message: 'Let’s catch up tomorrow.',
    image:
      'https://media.istockphoto.com/id/1498794865/photo/farmer-harvesting-ripe-potatoes-on-vegetable-field.jpg?s=612x612&w=0&k=20&c=P9m-BHMkzzAjNkweIPR9Y0oYsoTgNq3qv9_Ty_UhvxM=',
    timeAgo: '25 min',
    isOnline: true,
    unreadCount: 5,
  },
  {
    id: '4',
    name: 'Ahmed Nawaz',
    message: 'Can you check this for me?',
    image:
      'https://media.istockphoto.com/id/490592864/photo/african-boy-in-need-for-clean-water.jpg?s=612x612&w=0&k=20&c=yFCXj_EkP2X_EH_7aNhxVFtQlt5OedQxYqxcKDy2uuc=',
    timeAgo: '1 hour',
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: '5',
    name: 'Zara Malik',
    message: 'Got it, thanks!',
    image:
      'https://media.istockphoto.com/id/639465722/photo/close-up-portrait-of-serious-man.jpg?s=612x612&w=0&k=20&c=sphg7Qz0B0ek92jjEHkcMhbiY4jrEy9rVo3s_5_F6Z8=',
    timeAgo: '1 hour',
    isOnline: false,
    unreadCount: 3,
  },
  {
    id: '6',
    name: 'Usman Tariq',
    message: 'I’ll join the call shortly.',
    image:
      'https://media.istockphoto.com/id/898384278/photo/friends-dancing-in-the-park.jpg?s=612x612&w=0&k=20&c=6APFhy0sjdFt-79Mf0B_i3twOMjQjj6kswzFGMCwT8s=',
    timeAgo: '2 hours',
    isOnline: true,
    unreadCount: 0,
  },
  {
    id: '7',
    name: 'Noor Fatima',
    message: 'Happy birthday! 🎉',
    image:
      'https://media.istockphoto.com/id/1314776215/vector/antique-photograph-of-the-british-empire-annexation-of-the-territory-of-the-king-of-ado.jpg?s=612x612&w=0&k=20&c=C-tGdLFM3xvCw_7YNl3RvYXUJ6uoSZOOALWKF5rhVnk=',
    timeAgo: '3 hours',
    isOnline: true,
    unreadCount: 1,
  },
  {
    id: '8',
    name: 'Bilal Aslam',
    message: 'See you at the meeting.',
    image:
      'https://media.istockphoto.com/id/519314378/photo/young-african-man-and-woman-in-office-with-tablet.jpg?s=612x612&w=0&k=20&c=8NE-D7lvKKIutcRUXGlBKbuHrb6-pNEWQBcBt40r7eM=',
    timeAgo: 'Yesterday',
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: '9',
    name: 'Ayesha Siddiqui',
    message: 'Let’s finalize this today.',
    image:
      'https://media.istockphoto.com/id/938919394/photo/black-guy-stressing-and-headache.jpg?s=612x612&w=0&k=20&c=KxyUavERgANL5zppkJ_0okGNHdgANkDrJtlvbA-7RJE=',
    timeAgo: 'Yesterday',
    isOnline: false,
    unreadCount: 4,
  },
  {
    id: '10',
    name: 'Hamza Javed',
    message: 'Okay, I’ll do that.',
    image:
      'https://media.istockphoto.com/id/1471592510/photo/excited-overjoyed-black-man-holding-a-smartphone-receives-news-from-mobile-online-bet-bid.jpg?s=612x612&w=0&k=20&c=JHz54i5QP2GjbfqHhrM0VE3782zOW3bmXxFqjauOa00=',
    timeAgo: '2 days',
    isOnline: false,
    unreadCount: 0,
  },
];

export const user = [
  {
    id: '1',
    name: 'Shoaib',
    image:
      'https://media.istockphoto.com/id/1748505237/photo/man-holding-mobile-phone-reading-text-message-communication-online-isolated-on-blue-background.jpg?s=612x612&w=0&k=20&c=xHgjX-3b1i38PKHPLzOSNsntb876WrvDUjxOzSRQY1Y=',
  },
  {
    id: '2',
    name: 'Atif ',
    image:
      'https://media.istockphoto.com/id/1748510665/photo/happy-african-american-man-wearing-casual-clothes-dancing-having-fun-isolated-on-blue.jpg?s=612x612&w=0&k=20&c=J6oUg_A51fszDoB30SsUSsEkQmw2Qbp3ty15Mh_xcUA=',
  },
  {
    id: '3',
    name: 'Hawa',
    image:
      'https://media.istockphoto.com/id/921464396/photo/african-family-spending-time-together.jpg?s=612x612&w=0&k=20&c=1O6XYBrz6n1ItTXR4pQQubHchzM7bXpqxH50nlLTdbg=',
  },
  {
    id: '4',
    name: 'Norii',
    image:
      'https://media.istockphoto.com/id/950791104/photo/young-man-with-nigeria-flag-painted-on-his-face.jpg?s=612x612&w=0&k=20&c=cVVXba3FG9CJxlF5OVOaMnPDcCOrNtFtAfOGEhEviSU=',
  },
  // { id: '5', name: 'Ayesha', image: 'https://i.pravatar.cc/150?img=2' },
];

export const userProfile =
  'https://media.istockphoto.com/id/1671407049/photo/authentic-portrait-of-handsome-smiling-african-american-man-looking-at-camera.jpg?s=1024x1024&w=is&k=20&c=ZiVikdfwX4HhhD8SkY3PoGf8vKTn6ZOSlHFFj1VQsVs=';
export const postImage =
  'https://media.istockphoto.com/id/1207277864/photo/laughing-group-of-african-businesspeople-discussing-paperwork-in-an-office.jpg?s=612x612&w=0&k=20&c=ShIN5tn6zina9dZXWnCMTVGmih0VPXC1MWuNWnMeO14=';

export const chats = [
  {
    id: '1',
    user: {
      _id: '2',
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    lastMessage: {
      text: 'Hey, how are you doing? I was thinking we could meet tomorrow',
      createdAt: new Date(Date.now() - 1000 * 60 * 2),
    },
    unreadCount: 3,
    isOnline: true,
    isGroup: false,
  },
  {
    id: '2',
    user: {
      _id: '3',
      name: 'Family Group',
      avatar: 'https://i.pravatar.cc/300?img=5',
    },
    lastMessage: {
      text: 'Mom: Dinner at 8pm tonight!',
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
    },
    unreadCount: 0,
    isOnline: false,
    isGroup: true,
  },
  {
    id: '3',
    user: {
      _id: '4',
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    lastMessage: {
      text: 'The documents are ready for review',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
    unreadCount: 1,
    isOnline: true,
    isGroup: false,
  },
  {
    id: '4',
    user: {
      _id: '5',
      name: 'Mark Taylor',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    lastMessage: {
      text: 'Let’s grab coffee later this week ☕',
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
    },
    unreadCount: 0,
    isOnline: true,
    isGroup: false,
  },
  {
    id: '5',
    user: {
      _id: '6',
      name: 'Project Team',
      avatar: 'https://i.pravatar.cc/300?img=8',
    },
    lastMessage: {
      text: 'David: I pushed the latest build to GitHub',
      createdAt: new Date(Date.now() - 1000 * 60 * 90),
    },
    unreadCount: 5,
    isOnline: false,
    isGroup: true,
  },
  {
    id: '6',
    user: {
      _id: '7',
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    lastMessage: {
      text: 'Can you send me the meeting notes?',
      createdAt: new Date(Date.now() - 1000 * 60 * 10),
    },
    unreadCount: 2,
    isOnline: true,
    isGroup: false,
  },
  {
    id: '7',
    user: {
      _id: '8',
      name: 'Michael Brown',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    lastMessage: {
      text: 'I’ll call you when I’m free 📞',
      createdAt: new Date(Date.now() - 1000 * 60 * 5),
    },
    unreadCount: 0,
    isOnline: false,
    isGroup: false,
  },
  {
    id: '8',
    user: {
      _id: '9',
      name: 'Travel Buddies',
      avatar: 'https://i.pravatar.cc/300?img=12',
    },
    lastMessage: {
      text: 'Anna: Flights are booked for next month!',
      createdAt: new Date(Date.now() - 1000 * 60 * 300),
    },
    unreadCount: 7,
    isOnline: false,
    isGroup: true,
  },
  {
    id: '9',
    user: {
      _id: '10',
      name: 'Chris Evans',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    lastMessage: {
      text: 'Happy Birthday, buddy! 🎉',
      createdAt: new Date(Date.now() - 1000 * 60 * 1440),
    },
    unreadCount: 0,
    isOnline: true,
    isGroup: false,
  },
  {
    id: '10',
    user: {
      _id: '11',
      name: 'Sophia Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    lastMessage: {
      text: 'Sent you the updated design mockups.',
      createdAt: new Date(Date.now() - 1000 * 60 * 240),
    },
    unreadCount: 4,
    isOnline: true,
    isGroup: false,
  },
  {
    id: '11',
    user: {
      _id: '12',
      name: 'Developers Hub',
      avatar: 'https://i.pravatar.cc/300?img=18',
    },
    lastMessage: {
      text: 'John: Remember to submit your PR before standup',
      createdAt: new Date(Date.now() - 1000 * 60 * 400),
    },
    unreadCount: 6,
    isOnline: false,
    isGroup: true,
  },
  {
    id: '12',
    user: {
      _id: '13',
      name: 'Daniel Lee',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    lastMessage: {
      text: 'Got the tickets for the concert 🎶',
      createdAt: new Date(Date.now() - 1000 * 60 * 50),
    },
    unreadCount: 0,
    isOnline: true,
    isGroup: false,
  },
  {
    id: '13',
    user: {
      _id: '14',
      name: 'Olivia Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    lastMessage: {
      text: 'Don’t forget our yoga class tomorrow 🧘‍♀️',
      createdAt: new Date(Date.now() - 1000 * 60 * 200),
    },
    unreadCount: 1,
    isOnline: true,
    isGroup: false,
  },
  {
    id: '14',
    user: {
      _id: '15',
      name: 'College Friends',
      avatar: 'https://i.pravatar.cc/300?img=25',
    },
    lastMessage: {
      text: 'Mike: Who’s up for a reunion this weekend?',
      createdAt: new Date(Date.now() - 1000 * 60 * 500),
    },
    unreadCount: 8,
    isOnline: false,
    isGroup: true,
  },
  {
    id: '15',
    user: {
      _id: '16',
      name: 'Rachel Green',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    lastMessage: {
      text: 'Let’s binge-watch something tonight 🍿',
      createdAt: new Date(Date.now() - 1000 * 60 * 15),
    },
    unreadCount: 0,
    isOnline: true,
    isGroup: false,
  },
];
