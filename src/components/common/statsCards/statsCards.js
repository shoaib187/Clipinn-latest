import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FONT } from '../../constants/font';
import { wp } from '../../constants/responsiveSize';
import { COLORS } from '../../constants/colors';

const StatsCards = () => {
  const statsData = [
    {
      title: 'Attendance',
      value: '95%',
      subtext: 'This month',
      iconName: 'calendar-today',
      gradientColors: ['#F5FBF5', '#E8F5E9'], // Very light green
      iconColor: '#2E7D32',
      iconBgColor: 'rgba(46, 125, 50, 0.08)', // More transparent
      textColor: '#2E7D32',
      valueColor: '#1B5E20',
      subtextColor: 'rgba(46, 125, 50, 0.6)', // Softer subtext
    },
    {
      title: 'Leave Balance',
      value: '12',
      subtext: 'Days remaining',
      iconName: 'beach-access',
      gradientColors: ['#F5FAFF', '#E3F2FD'], // Very light blue
      iconColor: '#1565C0',
      iconBgColor: 'rgba(21, 101, 192, 0.08)',
      textColor: '#1565C0',
      valueColor: '#0D47A1',
      subtextColor: 'rgba(21, 101, 192, 0.6)',
    },
    {
      title: 'Tasks Completed',
      value: '18/24',
      subtext: 'This week',
      iconName: 'check-circle',
      gradientColors: ['#FFFCF5', '#FFF8E1'], // Very light amber
      iconColor: '#FFA000',
      iconBgColor: 'rgba(255, 160, 0, 0.08)',
      textColor: '#FFA000',
      valueColor: '#FF8F00',
      subtextColor: 'rgba(255, 160, 0, 0.6)',
    },
    {
      title: 'Upcoming Meetings',
      value: '3',
      subtext: 'Today',
      iconName: 'meeting-room',
      gradientColors: ['#FBF5FB', '#F3E5F5'], // Very light purple
      iconColor: '#8E24AA',
      iconBgColor: 'rgba(142, 36, 170, 0.08)',
      textColor: '#8E24AA',
      valueColor: '#6A1B9A',
      subtextColor: 'rgba(142, 36, 170, 0.6)',
    },
  ];
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <LinearGradient
            key={index}
            colors={stat.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.statCard, { borderColor: `${stat.textColor}20` }]}
          >
            <View style={styles.statHeader}>
              <View
                style={[
                  styles.statIconContainer,
                  { backgroundColor: stat.iconBgColor },
                ]}
              >
                <Icon name={stat.iconName} size={16} color={stat.iconColor} />
              </View>
              <Text
                numberOfLines={2}
                style={[styles.statTitle, { color: stat.textColor }]}
              >
                {stat.title}
              </Text>
            </View>
            <Text style={[styles.statValue, { color: stat.valueColor }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statSubtext, { color: stat.subtextColor }]}>
              {stat.subtext}
            </Text>
          </LinearGradient>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    // backgroundColor: COLORS.black,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderWidth: 1,
    paddingVertical: 6,
    // borderColor: 'rgba(0,0,0,0.05)',
  },
  statHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    // marginBottom: 8,
  },
  statIconContainer: {
    width: wp(8),
    height: wp(8),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONT.PoppinsMedium,
    // backgroundColor: 'red',
  },
  statValue: {
    fontSize: 24,
    fontFamily: FONT.PoppinsSemiBold,
  },
  statSubtext: {
    fontSize: 12,
    fontFamily: FONT.PoppinsRegular,
  },
});

export default StatsCards;
