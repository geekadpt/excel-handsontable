<template>
  <div class="text-center">

    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
    import { EventBus } from '../event-bus.js';
    export default {
        name: "Oauth",
        data: () => ({
            overlay:true
        }),
        created() {
            this.$store.dispatch('oauth', {
                    social : this.$route.query.social_type,
                    code : this.$route.query.code,
                });
                this.$watch(this.$store.getters.getOauthStatus, function () {
                    if (this.$store.getters.getOauthStatus() === 2) {
                        this.$store.dispatch('getMyInfo');
                        EventBus.$emit('open-message', {
                            text: this.$t('m.layout.oauth.success')
                        });
                        this.$router.push({name:'Desktop'});
                    }
                    if (this.$store.getters.getOauthStatus() === 3) {
                        EventBus.$emit('open-message', {
                            text: this.$store.getters.getOauthErrors
                        });
                    }
                });
        },
    }
</script>
</script>