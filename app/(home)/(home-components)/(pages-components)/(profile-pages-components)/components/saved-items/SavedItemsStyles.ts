import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: 'bold',
    color: '#623AA2',
    marginBottom: 15,
    textAlign: 'right',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#495057',
  },
  sectionContent: {
    padding: 12,
  },
  savedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  dateText: {
    color: '#6c757d',
    fontStyle: 'italic',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    padding: 5,
  },
  emptyText: {
    color: '#6c757d',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 10,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  letterGroup: {
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  letterHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  letterActions: {
    flexDirection: 'row',
    gap: 10,
  },
  letterBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#623AA2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  letterBadgeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  letterCount: {
    color: '#6c757d',
    fontSize: 14,
  },
  namesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'flex-start',
  },
  nameItem: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  nameContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;