import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import dayjs from 'dayjs';

export default function WeeklyCalendar() {
  const [selected, setSelected] = useState(dayjs().format('YYYY-MM-DD'));

  const weekDates = Array.from({ length: 7 }).map((_, i) =>
    dayjs().startOf('week').add(i, 'day'),
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={weekDates}
        keyExtractor={item => item.format('YYYY-MM-DD')}
        renderItem={({ item }) => {
          const isSelected = selected === item.format('YYYY-MM-DD');
          return (
            <TouchableOpacity
              style={[styles.dayBox, isSelected && styles.selectedDay]}
              onPress={() => setSelected(item.format('YYYY-MM-DD'))}
            >
              <Text>{item.format('ddd')}</Text>
              <Text>{item.format('DD')}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 50 },
  dayBox: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: 'blue',
  },
});
