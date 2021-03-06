<template>
  <section class="container mt-5">
    <h4 class="text-center mb-4 text-secondary">Add Bootcamp</h4>
    <p class="text-center">
      Important: You must be affiliated with a bootcamp to add to DevCoach
    </p>

    <v-form ref="form" v-model="valid" @submit.prevent="handleBootcampCreate">
      <div class="row">
        <div class="col-md-6">
          <div class="card bg-white py-2 px-4">
            <div class="card-body">
              <h3 class="text-secondary">Location & Contact</h3>

              <!-- NAME -->
              <v-text-field
                v-model="name"
                label="Bootcamp Name"
                :rules="nameRules"
                required
              ></v-text-field>

              <!-- ADDRESS -->

              <v-text-field
                v-model="address"
                label="Full Address"
                :rules="addressRules"
                hint="Street, city, state, etc"
                required
              ></v-text-field>
              <!-- NUMBER -->
              <v-text-field
                v-model="phone"
                :rules="phoneRules"
                label="Phone Number"
                required
              ></v-text-field>
              <!-- EMAIL -->
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-Mail"
                required
              ></v-text-field>

              <!-- WEBSITE -->
              <v-text-field
                v-model="website"
                :rules="webRules"
                label="Website URL"
                required
              ></v-text-field>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card bg-white py-2 px-4">
            <div class="card-body">
              <h3 class="text-secondary">Other Info</h3>
              <!-- DESCRIPTION -->
              <v-textarea
                v-model="description"
                :counter="200"
                clearable
                clear-icon="cancel"
                required
                :rules="descriptionRules"
                label="Description"
                hint="No more than 200 characters"
              ></v-textarea>
              <!-- CAREERS -->
              <v-select
                class="mt-5"
                v-model="items"
                :items="items"
                attach
                chips
                label="Careers"
                multiple
              ></v-select>

              <!-- OTHERS -->
              <div class="container">
                <div class="row">
                  <div class="col-md-6 col sm-12">
                    <!-- HOUSING -->
                    <v-checkbox
                      v-model="housing"
                      label="Housing"
                      color="success"
                      hide-details
                    ></v-checkbox>
                  </div>

                  <div class="col-md-6 col sm-12">
                    <!-- JOB ASSISTANCE -->
                    <v-checkbox
                      v-model="jobAssistance"
                      label="Job Assistance"
                      color="success"
                      hide-details
                    ></v-checkbox>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 col sm-12">
                    <!-- JOB GUARANTEE -->
                    <v-checkbox
                      v-model="jobGuarantee"
                      label="Job Guarantee"
                      color="success"
                      hide-details
                    ></v-checkbox>
                  </div>

                  <div class="col-md-6 col sm-12">
                    <!-- ACCEPT GI BILL -->
                    <v-checkbox
                      v-model="acceptGI"
                      label="Accept GI Bill"
                      color="success"
                      hide-details
                    ></v-checkbox>
                  </div>
                </div>
              </div>

              <p class="text-muted my-4">
                *After you add the bootcamp, you can add the specific courses
                offered
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <BaseButton name="Add Bootcamp" :loading="loading" />
      </div>
    </v-form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingMixin from '@mixins/LoadingMixins';
export default {
  computed: mapGetters(['getErr', 'getAuthUser']),
  mixins: [LoadingMixin],
  data() {
    return {
      valid: true,
      name: '',
      address: '',
      description: '',
      website: '',
      phone: '',
      housing: false,
      jobAssistance: false,
      jobGuarantee: false,
      acceptGI: false,
      email: '',
      items: [
        'Web Development',
        'Mobile Development',
        'UI/UX',
        'Data Science',
        'Business',
        'Others'
      ],
      others: ['Housing', 'Job Assistance', 'Job Guarantee', 'Accept GI Bill'],

      addressRules: [v => !!v || 'Address is required'],
      descriptionRules: [
        value => !!value || 'Bootcamp Description is Required.',
        v => v.length <= 200 || 'Max 200 characters'
      ],

      webRules: [
        v => !!v || 'Website URL is required',
        v =>
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
            v
          ) || 'please use a valid URL with HTTP or HTTPS'
      ],
      phoneRules: [
        v => !!v || 'Phone Number is required',
        v =>
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) ||
          'Phone Number must be valid'
      ],
      nameRules: [v => !!v || 'Name is required'],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    };
  },
  methods: {
    ...mapActions(['createBootcamps']),
    handleBootcampCreate() {
      if (this.$refs.form.validate()) {
        this.toggleLoading();
        this.snackbar = true;

        const data = {
          name: this.name,
          description: this.description,
          website: this.website,
          phone: this.phone,
          email: this.email,
          address: this.address,
          careers: this.items,
          housing: this.housing,
          jobAssistance: this.jobAssistance,
          jobGuarantee: this.jobGuarantee,
          acceptGi: this.acceptGI,
          user: this.getAuthUser._id
        };

        this.createBootcamps(data).then(res => {
          this.toggleLoading();
          if (res && res.data.success) {
            this.$noty.success('bootcamp created successfully');
            this.$router.push('/manage_bootcamp');
          } else {
            this.$noty.error(this.getErr);
          }
        });
      }
    }
  }
};
</script>

<style>
.v-input--selection-controls__input + .v-label {
  position: relative;
  top: 2.5px !important;
}
</style>
