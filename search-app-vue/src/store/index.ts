import { createStore } from 'vuex';
import api from '@/api';
import axios from 'axios';
import { Asset } from '@/interfaces';
import noty from '@/noty';

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
    EMPTY_ASSETS(state: AppStore) {
      state.assets.splice(0, state.assets.length);
    },
    REMOVE_ASSET(state: AppStore, p: Asset) {
      const index = state.assets.findIndex(ass => ass.id === p.id);
      if(index !== -1) {
        state.assets.splice(index, 1);
      } else {
        const error = new Error('Cannot find asset');
        noty.error('Error', error.message);
        throw error;
      }
    },
    DO_LIKE(state: AppStore, assetId: number) {
      const assetIndex = state.assets.findIndex((el) => el.id === assetId);
      if(assetIndex !== -1) {
        const likeIndex = state.assets[assetIndex].likes.findIndex((el) => el.id === state.id);
        if(likeIndex === -1) {
          //add like
          state.assets[assetIndex].likes.push({id: state.id, nickname: state.nickname});
        } else {
          // remove like
          state.assets[assetIndex].likes.splice(likeIndex, 1);
        }
      } else {
        const error = new Error('Cannot find asset');
        noty.error('Error', error.message);
        throw error;
      }
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
        if (e.status === 500) {
          e.message = 'Unexpected server error, try to connect later'
        } else {
          e.message = 'Credintials mismatch'
        }
        noty.error('Error', e.message);
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
        if (e.status === 500) {
          e.message = 'Unexpected server error, try to connect later'
        } else {
          e.message = 'Credentials error'
        }
        noty.error('Error', e.message);
        throw new Error(e);
      }
    },
    async GetAssets({ commit }) {
      try {
        const { data } = await axios.get(api.host + api.urls.getAssets);
        if(data.assets?.length) {
            commit('EMPTY_ASSETS');
            commit('SET_ASSETS', data.assets);
        } else {
          throw new Error("Aseets havent been provided");
        }
      }catch(e) {
        noty.error('Error', e.message);
        throw new Error(e);
      }
    },
    async DoLike({ commit }, assetid: number) {
        try {
          const { data } = await axios.get(api.host + api.urls.like(this.state.id, assetid))
          
          if(data.message) {
            commit('DO_LIKE', assetid);
            noty.success('Like', data.message)
          } else {
            throw new Error('Wrong response');
          }
        } catch(e) {
          console.error(e);
          noty.error('Error', e.message);
          throw new Error(e);
        }
    }
  },
})
