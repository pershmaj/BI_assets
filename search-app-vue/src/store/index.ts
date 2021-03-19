import { createStore } from 'vuex';
import api from '@/api';
import axios from 'axios';
import { Asset } from '@/interfaces';

//maybe u think that inreface name have to start with I but tslint dont think so
interface AppStore {
  token: string;
  id: number;
  nickname: string;
  assets: Asset[];
}

export default createStore({
  state: {
    id: 0,
    nickname: '',
    token: '',
    assets: [], 
  },
  mutations: {
    SET_TOKEN(state: AppStore, p: string) {
      state.token = p;
    },
    SET_NICKNAME(state: AppStore, p: string) {
      state.nickname = p;
    },
    SET_ID(state: AppStore, p: number) {
      state.id = p
    },
    SET_ASSETS(state: AppStore, p: Asset[]) {
      state.assets.push(...p);
    },
    REMOVE_ASSET(state: AppStore, p: Asset) {
      state.assets.filter(ass => ass.id !== p.id);
    },

  },
  actions: {
    async DoLogin({ commit }, cred) {
      try {
        const { data } = await axios.post(api.host + api.urls.login, cred);
        if (data.token && data.nickname) {
          commit('SET_TOKEN', data.token);
          commit('SET_NICKNAME', data.nickname);
          commit('SET_ID', data.id);
          // commit('SET_ASSETS', data.assets);
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          localStorage.setItem('user', JSON.stringify(data));
        } else {
          throw new Error('Server haven\'t returned token and nickname');
        }
      } catch (e) {
        console.error(e);
        if (e.status === 500) {
          e.message = 'Unexpected server error, try to connect later'
        } else {
          e.message = 'Credintials mismatch'
        }
        throw new Error(e);
      }
    },
    async DoRegistration({ commit }, cred) {
      try {
        const { data } = await axios.post(api.host + api.urls.registration, cred);
        if (data.token && data.nickname) {
          commit('SET_TOKEN', data.token);
          commit('SET_NICKNAME', data.nickname);
          commit('SET_ID', data.id);
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          localStorage.setItem('user', JSON.stringify(data));
        } else {
          throw new Error('Server haven\'t returned token and nickname');
        }
      } catch (e) {
        console.error(e);
        if (e.status === 500) {
          e.message = 'Unexpected server error, try to connect later'
        } else {
          e.message = 'Credintials error'
        }
        throw new Error(e);
      }
    },
  },
})
