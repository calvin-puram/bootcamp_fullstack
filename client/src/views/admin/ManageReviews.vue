<template>
  <section class="container mt-5" v-if="getBootcamps.data.length > 0">
    <div class="row">
      <div class="col-md-8 col-sm-12 ">
        <div class="card bg-white py-2 px-4">
          <div class="card-body">
            <h1 class="mb-4 text-secondary">Manage Reviews</h1>
            <table class="table table-responsive table-dark ">
              <thead>
                <tr>
                  <th scope="col">Bootcamp</th>
                  <th scope="col">Rating</th>
                  <th scope="col">CreatedAt</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody v-for="bootcamp in getBootcamps.data" :key="bootcamp._id">
                <tr>
                  <td>{{ bootcamp.name }}</td>
                  <td>
                    {{ bootcamp.averageRating ? bootcamp.averageRating : 0.0 }}
                  </td>
                  <td>{{ new Date(bootcamp.createdAt).toDateString() }}</td>
                  <td>
                    <div>
                      <router-link
                        :to="
                          `/bootcamp/${bootcamp._id}/${bootcamp.slug}/createReview`
                        "
                      >
                        <v-btn class="bg-color mr-3 table_actions_1" dark
                          ><BaseIcon prop="fas fa-pencil-alt"
                        /></v-btn>
                      </router-link>

                      <router-link
                        :to="
                          `/bootcamp/${bootcamp._id}/${bootcamp.slug}/reviews`
                        "
                      >
                        <v-btn class="bg-color " dark
                          ><BaseIcon prop="fas fa-trash"
                        /></v-btn>
                      </router-link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NProgress from 'nprogress';
import store from '@store/index';

export default {
  computed: mapGetters(['getBootcamps']),
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch('getAllBootcamps').then(res => {
      if (res && res.data.success) {
        NProgress.done();
      }
    });
    next();
  }
};
</script>

<style scoped>
/* mobile phone screen sm <= 425px */
@media screen and (max-width: 425px) {
  .table_actions_1 {
    margin-bottom: 1rem;
  }

  h1.text-secondary {
    font-size: 20px;
  }
}
</style>
