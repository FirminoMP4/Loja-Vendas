import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e8f0fe', // fundo levemente azul claro
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 16,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 14,
    paddingVertical: 10,
    // sombra leve para dar profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    marginTop: 24,
    borderRadius: 10,
    backgroundColor: '#1a73e8', // azul mais vivo
    paddingVertical: 12,
    shadowColor: '#1a73e8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
