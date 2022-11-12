<template>

    <!-- Not so nice type of messenger -->
    <!-- <iframe
    allow="microphone;"
    width="350"
    height="430"
    src="https://console.dialogflow.com/api-client/demo/embedded/eed261ce-8c9f-4ef9-ab85-c650e0728f11">
    </iframe> -->

    <!-- Nicer messgener but can't get script tag below to work rn -->
    <df-messenger
    intent="WELCOME"
    chat-title="BBDC FAQ"
    agent-id="eed261ce-8c9f-4ef9-ab85-c650e0728f11"
    language-code="en"
    ></df-messenger>
</template>

<script>
export default {
    created() {
        const dialogExternalScript = document.createElement('script');
        dialogExternalScript.setAttribute('src', 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1');
        document.head.appendChild(dialogExternalScript);
    },
    methods: {
    },
}
    
</script>
    

<!-- <component is="script" src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"> </component> -->