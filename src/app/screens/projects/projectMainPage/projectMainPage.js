// import React, {useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   Animated,
//   StatusBar,
//   Dimensions,
// } from 'react-native';

// import Feather from 'react-native-vector-icons/Feather';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import ActiveProjectCard from '../../../../components/common/activeProjectCard/activeProjectCard';
// import {COLORS} from '../../../../components/constants/colors';
// import {wp} from '../../../../components/constants/responsiveSize';
// import {FONT} from '../../../../components/constants/font';

// const {height} = Dimensions.get('window');
// const ITEM_HEIGHT = height * 0.2;

// export default function ProjectMainPage({navigation}) {
//   const [selectedFilter, setSelectedFilter] = useState('All');

//   const filters = ['All', 'Ongoing', 'Completed'];

//   const scrollY = useRef(new Animated.Value(0)).current;
//   const projects = [
//     {
//       id: '1',
//       title: 'Website Redesign',
//       category: 'Design',
//       description: 'Complete overhaul of company website with modern UI/UX',
//       progress: 75,
//       team: [
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//       ],
//       dueDate: 'May 15',
//       color: '#6c5ce7',
//     },
//     {
//       id: '2',
//       title: 'Mobile App Launch',
//       category: 'Development',
//       description: 'New customer-facing iOS/Android application',
//       progress: 42,
//       team: [
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//       ],
//       dueDate: 'Jun 3',
//       color: '#00b894',
//     },
//     {
//       id: '3',
//       title: 'Marketing Campaign',
//       category: 'Marketing',
//       description: 'Q3 product launch marketing materials',
//       progress: 18,
//       team: [
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//       ],
//       dueDate: 'Apr 28',
//       color: '#fd79a8',
//     },
//     {
//       id: '4',
//       title: 'API Integration',
//       category: 'Development',
//       description: 'Connect with third-party payment processor',
//       progress: 90,
//       team: [
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//         'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//       ],
//       dueDate: 'May 2',
//       color: '#0984e3',
//     },
//   ];

//   const filteredProjects = projects.filter(p => {
//     if (selectedFilter === 'All') return true;
//     if (selectedFilter === 'Ongoing') return p.progress < 100;
//     if (selectedFilter === 'Completed') return p.progress === 100;
//     return true;
//   });

//   const renderProjectCard = ({item}) => (
//     <ActiveProjectCard
//       item={item}
//       onPress={() => navigation.navigate('TaskDetails')}
//     />
//   );

//   const [finalHeight, setFinalHeight] = useState(null);
//   // Animate from 60 → 0 height on scroll
//   const animatedHeight = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [ITEM_HEIGHT, finalHeight],
//     extrapolate: 'clamp',
//   });
//   const color = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: ['#fff', '#111'],
//     extrapolate: 'clamp',
//   });

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.backdrop,
//           {position: 'absolute', height: animatedHeight},
//         ]}
//       />

//       <View
//         onLayout={e => setFinalHeight(e.nativeEvent.layout.height)}
//         style={styles.header}>
//         <Text style={styles.headerTitle}>Active Projects</Text>
//         <View style={styles.headerActions}>
//           <TouchableOpacity style={styles.searchButton}>
//             <Feather name="search" size={20} color="#fff" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => navigation.navigate('CreateProject')}>
//             <AntDesign name="plus" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.filterContainer}>
//         {filters.map(filter => {
//           const isActive = selectedFilter === filter;
//           return (
//             <TouchableOpacity
//               key={filter}
//               style={[styles.filterButton, isActive && styles.activeFilter]}
//               onPress={() => setSelectedFilter(filter)}>
//               <Text
//                 style={[
//                   styles.filterText,
//                   isActive && styles.activeFilterText,
//                 ]}>
//                 {filter}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//       <Animated.FlatList
//         data={filteredProjects}
//         renderItem={renderProjectCard}
//         keyExtractor={item => item.id}
//         showsVerticalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{nativeEvent: {contentOffset: {y: scrollY}}}],
//           {
//             useNativeDriver: false,
//           },
//         )}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: StatusBar.currentHeight || 0,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 14,
//     // backgroundColor: 'red',
//     paddingVertical: 24,
//   },
//   headerTitle: {
//     fontSize: wp(6.5),
//     color: '#fff',
//     fontFamily: FONT.PoppinsSemiBold,
//     marginBottom: -4,
//   },
//   headerActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchButton: {
//     padding: 8,
//     marginRight: 10,
//   },
//   addButton: {
//     backgroundColor: '#333',
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     marginHorizontal: 14,
//     paddingVertical: 15,
//     // backgroundColor: '#fff',
//   },
//   filterButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginRight: 10,
//     backgroundColor: '#eee', // inactive background
//   },
//   activeFilter: {
//     backgroundColor: COLORS.btnColor, // active background
//   },
//   filterText: {
//     color: '#666', // inactive text color
//     fontSize: wp(4),
//     fontFamily: FONT.PoppinsRegular,
//     marginBottom: -4,
//   },
//   activeFilterText: {
//     color: '#fff',
//   },
//   listContainer: {
//     paddingHorizontal: 14,
//     paddingTop: 14,
//   },

//   // fsadfdf
//   backdrop: {
//     position: 'absolute',
//     top: StatusBar.currentHeight || 0,
//     left: 0,
//     right: 0,
//     backgroundColor: COLORS.black,
//   },
// });

import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import ActiveProjectCard from '../../../../components/common/activeProjectCard/activeProjectCard';
import {COLORS} from '../../../../components/constants/colors';
import {wp} from '../../../../components/constants/responsiveSize';
import {FONT} from '../../../../components/constants/font';

const {height} = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.25;
const ITEM_HEIGHT = height * 0.2;

export default function ProjectMainPage({navigation}) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [finalHeight, setFinalHeight] = useState(null);

  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current;

  const filters = [
    'All',
    'Ongoing',
    'Completed',
    'High Priority',
    'Design',
    'Development',
    'Marketing',
  ];

  const projects = [
    {
      id: '1',
      title: 'Website Redesign',
      category: 'Design',
      description: 'Complete overhaul of company website with modern UI/UX',
      progress: 75,
      team: [
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://randomuser.me/api/portraits/women/33.jpg',
        'https://randomuser.me/api/portraits/men/22.jpg',
      ],
      dueDate: 'May 15',
      color: '#6c5ce7',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Mobile App Launch',
      category: 'Development',
      description: 'New customer-facing iOS/Android application',
      progress: 42,
      team: [
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://randomuser.me/api/portraits/women/33.jpg',
      ],
      dueDate: 'Jun 3',
      color: '#00b894',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Marketing Campaign',
      category: 'Marketing',
      description: 'Q3 product launch marketing materials',
      progress: 18,
      team: [
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://randomuser.me/api/portraits/men/32.jpg',
      ],
      dueDate: 'Apr 28',
      color: '#fd79a8',
      priority: 'low',
    },
    {
      id: '4',
      title: 'API Integration',
      category: 'Development',
      description: 'Connect with third-party payment processor',
      progress: 90,
      team: [
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://randomuser.me/api/portraits/women/33.jpg',
        'https://randomuser.me/api/portraits/men/22.jpg',
      ],
      dueDate: 'May 2',
      color: '#0984e3',
      priority: 'high',
    },
  ];

  const filteredProjects = projects
    .filter(project => {
      // Filter by selected category
      if (selectedFilter === 'All') return true;
      if (selectedFilter === 'Ongoing') return project.progress < 100;
      if (selectedFilter === 'Completed') return project.progress === 100;
      if (selectedFilter === 'High Priority')
        return project.priority === 'high';
      if (
        selectedFilter === 'Design' ||
        selectedFilter === 'Development' ||
        selectedFilter === 'Marketing'
      ) {
        return project.category === selectedFilter;
      }
      return true;
    })
    .filter(project => {
      // Filter by search query
      if (!searchQuery) return true;
      return (
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  const renderProjectCard = ({item, index}) => {
    return (
      <ActiveProjectCard
        item={item}
        onPress={() => navigation.navigate('ProjectDetails', {project: item})}
      />
    );
  };

  // Header animation
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT * 0.8],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      {/* <Image
        source={require('../../../../assets/images/empty-projects.png')}
        style={styles.emptyImage}
      /> */}
      <Text style={styles.emptyTitle}>No Projects Found</Text>
      <Text style={styles.emptyText}>
        {searchQuery
          ? `No projects match "${searchQuery}"`
          : `No ${
              selectedFilter === 'All' ? '' : selectedFilter + ' '
            }projects`}
      </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => {
          setSelectedFilter('All');
          setSearchQuery('');
        }}>
        <Text style={styles.emptyButtonText}>Reset Filters</Text>
      </TouchableOpacity>
    </View>
  );

  const animatedHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [ITEM_HEIGHT, finalHeight],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.black}
        barStyle="light-content"
        animated
      />
      <Animated.View
        style={[
          styles.header,
          {
            // transform: [{translateY: headerTranslateY}, {scale: headerScale}],
            // opacity: headerOpacity,
          },
        ]}>
        <Text style={styles.headerTitle}>Active Projects</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('CreateProject')}>
            <AntDesign name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Expanded Filters */}
      <Animated.View style={[styles.filterExpanded]}>
        <FlatList
          horizontal
          data={filters}
          renderItem={({item}) => {
            const isActive = selectedFilter === item;
            return (
              <TouchableOpacity
                style={[
                  styles.filterButtonExpanded,
                  isActive && styles.activeFilterExpanded,
                ]}
                onPress={() => {
                  setSelectedFilter(item);
                }}>
                <Text
                  style={[
                    styles.filterTextExpanded,
                    isActive && styles.activeFilterTextExpanded,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterExpandedContent}
        />
      </Animated.View>

      {/* Project List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <Animated.FlatList
            data={filteredProjects}
            renderItem={renderProjectCard}
            keyExtractor={item => item.id}
            ListEmptyComponent={renderEmptyState}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true},
            )}
            scrollEventThrottle={16}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    // paddingTop: StatusBar.currentHeight,
  },

  header: {
    paddingHorizontal: 14,
    backgroundColor: COLORS.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  headerTitle: {
    fontSize: wp(7),
    color: '#fff',
    fontFamily: FONT.PoppinsSemiBold,
    marginBottom: -4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    height: 40,
  },
  searchButton: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    paddingRight: 15,
    fontSize: wp(4),
    fontFamily: FONT.PoppinsRegular,
    height: '100%',
    marginBottom: -5,
  },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  filterToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  filterExpanded: {
    // top: HEADER_HEIGHT - 30,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    overflow: 'hidden',
    // zIndex: 11,
  },
  filterExpandedContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  filterButtonExpanded: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#f5f7fa',
  },
  activeFilterExpanded: {
    backgroundColor: COLORS.btnColor,
  },
  filterTextExpanded: {
    color: '#666',
    fontSize: wp(3.8),
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -3,
  },
  activeFilterTextExpanded: {
    color: '#fff',
  },
  listContainer: {
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  separator: {
    height: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: HEADER_HEIGHT,
    paddingHorizontal: 40,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: wp(5),
    fontFamily: FONT.PoppinsSemiBold,
    color: '#333',
    marginBottom: 5,
  },
  emptyText: {
    fontSize: wp(4),
    fontFamily: FONT.PoppinsRegular,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: COLORS.btnColor,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: wp(4),
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -4,
  },
  header1: {
    position: 'absolute',
    top: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.black,
  },
});
