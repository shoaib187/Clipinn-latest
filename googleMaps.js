import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, UrlTile} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function GoogleMaps() {
  const mapRef = useRef();

  const dummyUsers = [
    {
      id: 1,
      name: 'Ayesha, 23',
      bio: 'Loves long walks and chai 🍵',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      location: {latitude: 31.5507, longitude: 74.3436},
    },
    {
      id: 2,
      name: 'Zara, 25',
      bio: 'Coffee addict ☕ | Book lover 📚',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      location: {latitude: 31.5525, longitude: 74.34},
    },
    {
      id: 3,
      name: 'Ali, 26',
      bio: 'Explorer 🌍 | Gym Rat 🏋️‍♂️',
      image: 'https://randomuser.me/api/portraits/men/11.jpg',
      location: {latitude: 31.5535, longitude: 74.345},
    },
    {
      id: 4,
      name: 'Hamza, 28',
      bio: 'Movie buff 🎬 | Tech nerd 👨‍💻',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      location: {latitude: 31.5485, longitude: 74.341},
    },
    {
      id: 5,
      name: 'Sara, 24',
      bio: 'Foodie 🍕 | Music lover 🎶',
      image: 'https://randomuser.me/api/portraits/women/30.jpg',
      location: {latitude: 31.549, longitude: 74.3398},
    },
  ];

  React.useEffect(() => {
    mapRef.current?.animateToRegion(
      {
        latitude: 31.5497,
        longitude: 74.3436,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      1000,
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        mapType="terrain"
        initialRegion={{
          latitude: 31.5497,
          longitude: 74.3436,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {dummyUsers?.map(user => (
          <Marker
            key={user.id}
            coordinate={user.location}
            tracksViewChanges={false} // Important for performance
            onPress={() => console.log(user)}>
            <View style={styles.markerContainer}>
              <Image
                source={{uri: user.image}}
                style={styles.userImage}
                resizeMode="cover"
                onError={e =>
                  console.log('Image load error:', e.nativeEvent.error)
                }
              />
              <Text style={styles.userName}>{user.name}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Floating Profile Card */}
      <View style={styles.floatingCard}>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/women/44.jpg'}}
          style={styles.profileImage}
          onError={e =>
            console.log('Profile image error:', e.nativeEvent.error)
          }
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Ayesha, 23</Text>
          <Text style={styles.profileBio}>Loves long walks and chai 🍵</Text>
        </View>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="heart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#f0f0f0', // Fallback color
  },
  userName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  floatingCard: {
    position: 'absolute',
    bottom: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 15,
    elevation: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#f0f0f0', // Fallback color
  },
  profileInfo: {
    marginLeft: 10,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileBio: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  likeButton: {
    width: 45,
    height: 45,
    backgroundColor: 'red',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
