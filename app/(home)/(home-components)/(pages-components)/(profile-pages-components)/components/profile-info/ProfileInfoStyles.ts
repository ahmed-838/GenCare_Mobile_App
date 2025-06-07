import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    padding: SCREEN_WIDTH * 0.04,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileImage: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: SCREEN_WIDTH * 0.125,
    borderWidth: 3,
    borderColor: '#623AA2',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: SCREEN_WIDTH * 0.33,
    backgroundColor: '#623AA2',
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
  infoContainer: {
    gap: 15,
    paddingBottom: 10,
  },
  buttonContainer: {
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  fieldIcon: {
    marginRight: 15,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  emptyFieldValue: {
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: SCREEN_WIDTH * 0.9,
    maxHeight: SCREEN_HEIGHT * 0.8,
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
    flexGrow: 1,
  },
  editFieldContainer: {
    marginBottom: 20,
    flexShrink: 0,
  },
  editFieldLabel: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
    fontWeight: '500',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 50,
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
  pickerWrapper: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 50,
  },
  bloodTypePicker: {
    ...Platform.select({
      ios: {
        width: '100%',
        height: 50,
      },
      android: {
        width: '100%',
        height: 50,
        color: '#1F2937',
      }
    }),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10
  },
  avatarItem: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  selectedAvatarItem: {
    borderWidth: 2,
    borderColor: '#623AA2',
  },
  selectedAvatarOverlay: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  editButtons: {
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
}); 

export default styles;