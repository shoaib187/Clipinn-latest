import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';
import { FONT } from '../constants/font';
import { wp } from '../constants/responsiveSize';

export default function Categories({ categories }) {
  const [activeCategory, setActiveCategory] = useState('Dashboard');
  const renderCategoryItem = item => (
    <TouchableOpacity
      key={item.id}
      onPress={() => setActiveCategory(item.name)}
      style={styles.categoryItemContainer}
    >
      <View
        style={[
          styles.categoryIconContainer,
          {
            // backgroundColor: item?.bgColor,
            backgroundColor:
              activeCategory === item.name ? COLORS.btnColor : '#f9f9f9',
          },
        ]}
      >
        <Icon
          name={item.icon}
          size={28}
          color={activeCategory === item.name ? 'white' : '#757575'}
        />
      </View>
      <Text
        style={[
          styles.categoryText,
          {
            color: activeCategory === item.name ? COLORS.btnColor : '#757575',
          },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.sectionTitle}>Quick Access</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        {categories.map(renderCategoryItem)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Categories
  categoriesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: FONT.PoppinsSemiBold,
    fontSize: wp(4.5),
    marginBottom: 10,
  },
  categoryItemContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
  },
});
