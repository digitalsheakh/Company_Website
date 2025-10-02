import { View, StyleSheet, ScrollView, Image, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title, Text, Button, TouchableRipple, Card, Chip, Surface } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { Bell, Calendar, Share2, FileText, Clock } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const HERO_IMAGE = "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=3440&auto=format&fit=crop";

export default function HomeScreen() {
  const router = useRouter();
  
  const openUKVI = () => {
    Linking.openURL('https://www.gov.uk/contact-ukvi');
  };

  const quickActions = [
    {
      title: 'View eVisa',
      icon: FileText,
      route: '/guide',
      color: '#4F46E5',
      description: 'Access your digital visa',
    },
    {
      title: 'Share Status',
      icon: Share2,
      route: '/share',
      color: '#059669',
      description: 'Generate share codes',
    },
    {
      title: 'Travel Tips',
      icon: Calendar,
      route: '/tips',
      color: '#B45309',
      description: 'Essential guidelines',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: HERO_IMAGE }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Animated.View entering={FadeInDown.delay(200).duration(1000)}>
              <Title style={styles.title}>Welcome to eVisa Helper</Title>
              <Text style={styles.subtitle}>
                Simplifying your UK immigration journey
              </Text>
              <Link href="/guide" asChild>
                <Button
                  mode="contained"
                  style={styles.button}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}>
                  Get Started
                </Button>
              </Link>
            </Animated.View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Quick Actions</Title>
          <View style={styles.quickActions}>
            {quickActions.map((action, index) => (
              <Animated.View 
                key={action.title}
                entering={FadeInDown.delay(300 + index * 100).duration(800)}
                style={styles.actionCardContainer}>
                <Surface style={styles.actionCard}>
                  <Pressable
                    onPress={() => router.push(action.route)}
                    style={styles.actionCardContent}>
                    <View style={[styles.iconContainer, { backgroundColor: action.color }]}>
                      <action.icon color="white" size={24} />
                    </View>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    <Text style={styles.actionDescription}>{action.description}</Text>
                  </Pressable>
                </Surface>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Important Reminders */}
        <Animated.View 
          entering={FadeInDown.delay(600).duration(800)}
          style={styles.section}>
          <Title style={styles.sectionTitle}>Important Reminders</Title>
          <Card style={styles.reminderCard}>
            <Card.Content>
              <View style={styles.reminderHeader}>
                <Bell color="#DC2626" size={24} />
                <Chip style={styles.chip}>Time Sensitive</Chip>
              </View>
              <Text style={styles.reminderText}>
                Keep your passport details updated and ensure your eVisa hasn't expired
              </Text>
              <View style={styles.reminderFooter}>
                <Clock size={16} color="#64748B" />
                <Text style={styles.reminderFooterText}>Updated 2 hours ago</Text>
              </View>
            </Card.Content>
          </Card>
        </Animated.View>

        {/* Footer */}
        <Animated.View 
          entering={FadeInDown.delay(800).duration(800)}
          style={styles.footer}>
          <Text style={styles.footerText}>©️ 2025 eVisa Helper</Text>
          <TouchableRipple onPress={openUKVI}>
            <Text style={styles.link}>Contact UKVI</Text>
          </TouchableRipple>
          <Text style={styles.disclaimer}>
            Unofficial guide, not affiliated with UK Home Office
          </Text>
        </Animated.View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  heroContainer: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 24,
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    elevation: 4,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    }),
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  actionCardContainer: {
    width: '33.33%',
    paddingHorizontal: 8,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 4,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    }),
  },
  actionCardContent: {
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  reminderCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    borderColor: '#DC2626',
    borderWidth: 1,
    elevation: 4,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    }),
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#DC2626',
    marginLeft: 8,
  },
  reminderText: {
    fontSize: 16,
    color: '#1E293B',
    lineHeight: 24,
    marginBottom: 16,
  },
  reminderFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderFooterText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 6,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footerText: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 12,
  },
  link: {
    fontSize: 16,
    color: '#1E3A8A',
    textDecorationLine: 'underline',
    marginBottom: 12,
  },
  disclaimer: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});