import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 24, 
    backgroundColor: '#f9f9f9',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  number: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#007AFF',
  },
  title: {
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    fontSize: 24,
  },
  chartStyle: {
    marginVertical: 20,
    borderRadius: 16,
    backgroundColor: 'white',
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});
