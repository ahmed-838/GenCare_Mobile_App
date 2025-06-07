import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

 const styles = StyleSheet.create({
  container: {
    padding: SCREEN_WIDTH * 0.04,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: 'bold',
    color: '#623AA2',
  },
  cardContent: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 15,
  },
  healthInfo: {
    gap: 12,
  },
  infoField: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  editFieldContainer: {
    marginBottom: 20,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 50,
  },
  symptomsInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: SCREEN_WIDTH * 0.9,
    maxHeight: SCREEN_HEIGHT * 0.85,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#623AA2',
  },
  modalScrollContent: {
    flexGrow: 0,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
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
  emptyText: {
    color: '#6c757d',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonContainer: {
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
  },
  bloodPressureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  bpFieldContainer: {
    flex: 1,
  },
  bpLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  bpInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 50,
    textAlign: 'center',
  },
  bpSeparator: {
    fontSize: 24,
    color: '#6B7280',
    marginTop: 20,
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
  deleteButton: {
    padding: 5,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    padding: 5,
  },
  debugText: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  letterGroup: {
    marginBottom: 20,
  },
  letterHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  letterActions: {
    flexDirection: 'row',
    gap: 10,
  },
  letterHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#623AA2',
  },
  namesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  nameItem: {
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
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
  listContainer: {
    paddingVertical: 10,
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  bpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
}); 

export default  styles ;