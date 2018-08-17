import icon from '../assets/icon.png';

export function notify(message) {
    return checkPermission()
        .then(() => popNotification('Lang-editor', message));
}

function checkPermission() {
    return Notification
        .requestPermission()
        .then((result) => {
            if (result !== 'granted') {
                return Promise.reject(result);
            }
        });
}

function popNotification(title, message) {
    const notification = new Notification(title, {
        body: message,
        icon,
        silent: true
    });

    return notification;
}