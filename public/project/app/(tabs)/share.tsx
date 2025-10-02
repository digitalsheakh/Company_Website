import { StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title, Card, Button, TextInput } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';

const steps = [
  {
    id: '1',
    title: 'Visit GOV.UK',
    content: 'Go to gov.uk/view-prove-immigration-status.',
    action: () => Linking.openURL('https://www.gov.uk/view-prove-immigration-status'),
  },
  {
    id: '2',
    title: 'Sign In',
    content: 'Log in with your UKVI account.',
  },
  {
    id: '3',
    title: 'Generate Code',
    content: 'Select "Share your status" and get a code.',
  },
  {
    id: '4',
    title: 'Share It',
    content: 'Give the code and your birth date to the checker.',
  },
];

export default function ShareScreen() {
  const [shareCode, setShareCode] = useState('');

  const saveShareCode = async () => {
    try {
      await SecureStore.setItemAsync('shareCode', shareCode);
      Alert.alert('Success', 'Share code saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save share code');
    }
  };

  const copyShareCode = async () => {
    try {
      await Clipboard.setStringAsync(shareCode);
      Alert.alert('Success', 'Share code copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy share code');
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card} mode="outlined">
      <Card.Title
        title={`${item.id}. ${item.title}`}
        titleStyle={styles.cardTitle}
      />
      <Card.Content>
        <Title style={styles.cardContent}>{item.content}</Title>
        {item.action && (
          <Button
            mode="contained"
            onPress={item.action}
            style={styles.button}
            labelStyle={styles.buttonLabel}>
            Visit GOV.UK
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.title}>Get a Share Code</Title>
      <FlatList
        data={steps}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          <>
            <TextInput
              label="Save Your Share Code"
              value={shareCode}
              onChangeText={setShareCode}
              style={styles.input}
              mode="outlined"
              outlineColor="#1E3A8A"
            />
            <Button
              mode="contained"
              onPress={saveShareCode}
              style={styles.button}
              labelStyle={styles.buttonLabel}>
              Save
            </Button>
            <Button
              mode="outlined"
              onPress={copyShareCode}
              style={[styles.button, styles.outlineButton]}
              labelStyle={[styles.buttonLabel, styles.outlineButtonLabel]}>
              Copy
            </Button>
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
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
    color: '#1E3A8A',
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#1E3A8A',
    marginBottom: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: '#1E3A8A',
  },
  outlineButtonLabel: {
    color: '#1E3A8A',
  },
});