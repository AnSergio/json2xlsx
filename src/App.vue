<template>
  <div class="container">
    <h1>Bem vindo ao Tauri!</h1>

    <div class="row">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo vite" alt="Vite logo" />
      </a>
      <a href="https://tauri.app" target="_blank">
        <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>

    <div class="but cen">
      <button @click="onLeitura">Abrir Json</button>
      <button @click="onSalvarXLSX(dados.val)">Salvar Xlsx</button>
    </div>

    <p>Tabela de produtos.</p>

    <table border="1" style="width: 90dvw" class="tab cen">
      <thead>
        <tr>
          <th v-for="(lis, ind) of Object.keys(dados.val[0])" :key="ind">{{ PriUpperCase(lis) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(list, index) of dados.val" :key="index">
          <td v-for="(lis, ind) of list" :key="ind">{{ lis }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { PriUpperCase, onLeituraJson, onSalvarXLSX } from "./components/Funcoes";
import produtos from "./assets/produtos.json";
import type { ProdutosType } from "./components/Funcoes";

const dados = reactive<{ val: ProdutosType[] }>({ val: produtos });

const onLeitura = async () => {
  dados.val = await onLeituraJson();
};

/* */
</script>

<style scoped>
.cen {
  align-self: center;
  align-items: center;
  justify-content: center;
}

.but {
  gap: 4px;
  padding: 4px;
  display: flex;
}

.tab {
  width: 80dvw;
}

.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
