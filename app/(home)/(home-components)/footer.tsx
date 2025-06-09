import { View, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Footer() {
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const router = useRouter();

  const aboutUsContent = {
    title: "About GenCare",
    description: "GenCare is a comprehensive pregnancy care application designed to support expecting mothers throughout their pregnancy journey. We provide personalized health tracking, pregnancy information, and tools to ensure both mother and baby's wellbeing.",
    missionTitle: "Our Mission",
    missionDescription: "Our mission is to make pregnancy care accessible to all women, providing reliable information and tools that empower them to make informed decisions about their health and their baby's development.",
    team: [
      {
        "name": "Prof. Dr. Sayed El-Dahshan",
      },
      {
        "name": "Assist. Prof. Omneya Atef"
      }
    ],
    contact: {
      // email: "support@gencare.com",
      phone: "+20 122 4900 205",
        // website: "www.gencare.com"
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/(home)/(home-components)/(pages-components)/(profile-pages-components)')}
        >
          <Ionicons name="person" size={24} color="#623AA2" />
          <ThemedText style={styles.navText}>Profile</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => setIsAboutUsModalOpen(true)}
        >
          <Ionicons name="information-circle" size={24} color="#623AA2" />
          <ThemedText style={styles.navText}>About Us</ThemedText>
        </TouchableOpacity>
      </View>

      {/* About Us Modal */}
      <Modal
        visible={isAboutUsModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsAboutUsModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.aboutUsContainer}>
            <View style={styles.aboutUsHeader}>
              <ThemedText style={styles.aboutUsTitle}>{aboutUsContent.title}</ThemedText>
              <TouchableOpacity 
                onPress={() => setIsAboutUsModalOpen(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#623AA2" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.aboutUsContent}
              showsVerticalScrollIndicator={false}
            >
              <ThemedText style={styles.descriptionText}>
                {aboutUsContent.description}
              </ThemedText>

              <ThemedText style={styles.sectionTitle}>
                {aboutUsContent.missionTitle}
              </ThemedText>
              <ThemedText style={styles.descriptionText}>
                {aboutUsContent.missionDescription}
              </ThemedText>

              <ThemedText style={styles.sectionTitle}>
                Our Team
              </ThemedText>
              {aboutUsContent.team.map((member, index) => (
                <View key={index} style={styles.teamMemberCard}>
                  <View style={styles.teamMemberAvatar}>
                    <Ionicons name="person-circle" size={40} color="#623AA2" />
                  </View>
                  <View style={styles.teamMemberInfo}>
                    <ThemedText style={styles.teamMemberName}>{member.name}</ThemedText>
                 </View>
                </View>
              ))}

              <ThemedText style={styles.sectionTitle}>
                Contact Us
              </ThemedText>
              <View style={styles.contactItem}>
                <Ionicons name="call" size={20} color="#623AA2" />
                <ThemedText style={styles.contactText}>{aboutUsContent.contact.phone}</ThemedText>
              </View>

              <View style={styles.footer}>
                <ThemedText style={styles.footerText}>© 2023 GenCare. All Rights Reserved.</ThemedText>
              </View>

            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
  },
  navButton: {
    alignItems: 'center',
    padding: 8,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#623AA2',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutUsContainer: {
    width: '90%',
    height: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  aboutUsHeader: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#FAFAFA',
  },
  aboutUsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#623AA2',
  },
  closeButton: {
    padding: 5,
  },
  aboutUsContent: {
    padding: 20,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 20,
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#623AA2',
    marginBottom: 15,
    marginTop: 10,
  },
  teamMemberCard: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#F7F5FA',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  teamMemberAvatar: {
    marginRight: 15,
  },
  teamMemberInfo: {
    flex: 1,
  },
  teamMemberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  teamMemberRole: {
    fontSize: 14,
    color: '#623AA2',
    marginBottom: 5,
  },
  teamMemberDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginTop: 30,
    marginBottom: 20,
  },
});
