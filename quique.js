let widget;
const startBot = () => {
    widget = new BlipChat()
        .withAppKey('cm91dGVyY2VsdWxhb3dlbnM6ZjVhYmU0MWYtMzc2MS00MDRjLWFhYzQtMjQ1YTQ1Njg3MzIy')
        .withButton({ "color": "#2CC3D5", "icon": "" })
        .withCustomCommonUrl('https://take.chat.blip.ai/')
        .build();
        const blipChatOpenIframe = document.querySelector('#blip-chat-open-iframe');
        blipChatOpenIframe.classList.add('bounce-7')
};

window.onload = startBot;
