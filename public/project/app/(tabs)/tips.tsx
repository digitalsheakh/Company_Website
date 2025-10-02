import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title, Card, Switch, useTheme } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

const tips = [
  {
    id: '1',
    title: 'Prepare Ahead',
    content: 'Log in to GOV.UK before traveling and screenshot your eVisa.',
  },
  {
    id: '2',
    title: 'Carry Your Passport',
    content: 'Show your eVisa with the linked passport or ID.',
  },
  {
    id: '3',
    title: 'Explain at the Border',
    content: "Tell officers you have an eVisa—they will verify it.",
  },
];

export default function TipsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    loadDarkMode();
  }, []);

  const loadDarkMode = async () => {
    try {
      const value = await SecureStore.getItemAsync('darkMode');
      setIsDarkMode(value === 'true');
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
    }
  };

  const toggleDarkMode = async () => {
    try {
      const newValue = !isDarkMode;
      await SecureStore.setItemAsync('darkMode', String(newValue));
      setIsDarkMode(newValue);
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  const renderItem = ({ item }) => (
    <Card
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? '#1E3A8A' : '#FFFFFF' },
      ]}
      mode="outlined">
      <Card.Title
        title={`${item.id}. ${item.title}`}
        titleStyle={[
          styles.cardTitle,
          { color: isDarkMode ? '#FFFFFF' : '#1E3A8A' },
        ]}
      />
      <Card.Content>
        <Title
          style={[
            styles.cardContent,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}>
          {item.content}
        </Title>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#1E3A8A' : '#FFFFFF' },
      ]}>
      <Title
        style={[
          styles.title,
          { color: isDarkMode ? '#FFFFFF' : '#1E3A8A' },
        ]}>
        Travel Tips
      </Title>
      <FlatList
        data={tips}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Card style={styles.settingsCard}>
        <Card.Title
          title="Dark Mode"
          right={() => (
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              color={theme.colors.primary}
            />
          )}
        />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderColor: '#1E3A8A',
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 16,
  },
  settingsCard: {
    margin: 16,
  },
});