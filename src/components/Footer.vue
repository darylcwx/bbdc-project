<template>
    <div class="footer bg-light-blue-8 text-white">
        <div class="row">
            <div class="col-sm-6 operations q-px-md q-py-sm">
                <h5 class="text-left q-py-sm text-white text-bold">Operating Hours</h5>
                Mon - Fri: 0830 - 1930<br>
                Sat & Sun: 0830 - 1300<br>
                Closed on Public Holidays
            </div>
            <div class="col-sm-6 mobile q-px-md q-py-sm">
                <h5 class="q-py-sm text-left text-white text-bold">Mobile Application</h5>
                <div class="app">
                    <a href="https://apps.apple.com/sg/app/bbdc/id1382558683" target="_blank"><img src="@/assets/appstore.png" style="margin-right: 5px;" /></a>
                    <a href="https://play.google.com/store/apps/details?id=com.bbdc.android.user" target="_blank"><img
                            src="@/assets/playstore.png" /></a>
                </div>
            </div>
        </div>
        <div class="row justify-center">
            <a href="#">Terms of use</a>
            &nbsp;|&nbsp;
            <a href="#">Personal Data Protection Policy</a>
        </div>
        <div class="row justify-center text-center" style="padding-bottom: 10px;">
            Copyright © 2023 by BBDC. All Rights Reserved.
        </div>
    </div>
</template>


<script>


</script>


<style lang="scss" scoped>
.footer {
    height: 200px;
    width: 100%;
    font-family: 'Raleway', sans-serif;
}

.app {
    display: flex;
    flex-direction: row;
    flex-wrap: flex-end;
}
img {
    height: 40px;
}

.row {
    padding: 2px 0;
}

a {
    text-decoration: none;
    color: white;
}

a:visited {
    color: white;
}
</style>