import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const MeetingScreen = ({ route }: any) => {
    const { link } = route.params;

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: link }}
                style={{ flex: 1 }}
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
});

export default MeetingScreen;