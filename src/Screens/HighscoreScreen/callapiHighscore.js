import database from '@react-native-firebase/database';

export const fetchScores = async () => {
    try {
        const snapshot = await database().ref('/scores').once('value');
        const data = snapshot.val();

        const scoresArray = data
            ? Object.keys(data).map(key => ({
                  ...data[key],
                  id: key,
              }))
            : [];
        return scoresArray.sort((a, b) => b.score - a.score).slice(0, 50);
    } catch (error) {
        console.error('Error fetching scores:', error);
        return [];
    }
};
