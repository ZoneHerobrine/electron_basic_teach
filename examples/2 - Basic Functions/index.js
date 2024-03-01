document.getElementById('notifi').addEventListener('click', function() {
    var notification = new Notification('孩子', {
        body: '这并不好笑',
        icon: 'kobi.jpg',
        silent: true,
        requireInteraction: true
    });
    notification.onshow = function() {
        console.log('Notification showed');
    };
});

