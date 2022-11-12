<template>
    <q-layout view="hHh Lpr lFr">

        <q-header reveal elevated class="bg-dark text-white">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="@/assets/bbdc-small.png">
                    </q-avatar>
                    Bukit Better Driving Centre Ltd

                </q-toolbar-title>
                <q-space/>
                <q-tabs v-model="tab" shrink>
                    <q-tab name="tab1" label="Home" to="/"/>
                    <q-tab name="tab2" label="Tab 2"/>
                    <q-tab name="tab3" label="Tab 3"/>
                    <q-btn-dropdown stretch flat label="About Us">
                        <q-list>
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-item-label>Corporate Information</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-item-label>Social Contribution</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-item-label>Road Safety Events</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup> <!-- reroute to dev team .vue? -->
                                <q-item-section>
                                    <router-link to="/dev-team">
                                        <q-item-label>Dev Team</q-item-label>
                                    </router-link>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </q-tabs>
            </q-toolbar>

        </q-header>

    </q-layout>
</template>


<script>
export default {
    name: 'AppNavigation'
};

</script>

<style>
</style>