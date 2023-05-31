
<script>
  import DataItem from "../components/DataItem.svelte";
  import { fetchData } from "../lib/FetchData";
  import { fade } from 'svelte/transition';
  let loading = false;
  let error = false;
  let number = "";
  let dataList = [];
  let uniqueid = 0;

async function search() {
if(number==""){
    error = true;
    setTimeout(() => error = false, 1000);
}else{
  console.log(number)
  loading = true;
  const result = await fetchData(number);
  if (result) {
    console.log(result)
    if (result=="noproblem"){
        loading = false;
        error = true;
        setTimeout(() => error = false, 1000);
    }else{
    dataList = [...dataList, { ...result, uniqueid }];
    uniqueid++;
    loading = false;
    }
  }
}
}

  function removeData(uniqueid) {
  dataList = dataList.filter((data) => data.uniqueid !== uniqueid);
}

</script>

<div class="z-50 p-3 flex bg-slate-900 justify-between sticky top-0">
    <div class="no-select text-slate-100 text-xl font-bold">AUTOCODER</div>
    <div class="flex justify-between">
        {#if error}
    <div transition:fade class="mr-2 bg-gradient-to-r from-red-500 to-pink-500 py-1 px-2 rounded-lg text-white font-main">
        ⚠️
    </div>
    {/if}
    {#if loading}
    <div transition:fade class="mr-2 bg-gradient-to-r from-blue-500 to-cyan-500 py-1 px-2 rounded-lg text-white font-main">
        로딩중
    </div>
{/if}
    <div class="flex items-center w-[150px] bg-slate-100 rounded-lg row-end">
        <div class="w-full">
            <input bind:value="{number}" type="number" class="no-select w-full px-4 py-1 bg-slate-100 text-gray-800 rounded-l-lg focus:outline-none hover:bg-gray-300"
                placeholder="문제 ID">
        </div>
        <div>
            <button on:click={search} type="submit" class="flex items-center bg-cyan-500 hover:bg-blue-900 justify-center w-12 h-8 text-white rounded-r-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
        </div>
    </div>
</div>
    </div>

    <div class="-z-50 px-3 h-50">
        <div class="no-select md:flex md:justify-left font-regular relative block w-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3 text-base text-white font-main opacity-100">
            
            <h1 class="mr-2">AUTOCODER는 경문고등학교 정보 실습 사이트</h1>
            <div class="flex">
            <button class="flex bg-white rounded-lg text-slate-900 px-2" onclick="window.open('http://www.xn--vb0b16w99jldw3xnme.com/problemset.php')">
                <span class="mr-1">메이커창작과</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </button>
            <h1 class="ml-2">의 답을 제공합니다.</h1></div>
        </div>
        </div>

<div class="bg-slate-900 min-w-[20rem] px-3 pb-3 flex flex-col">
        
<!-- component -->
 {#each dataList as data}
 <div transition:fade>
<DataItem {data} on:remove="{() => removeData(data.uniqueid)}" />
</div>
{/each}
{#if loading}
<div transition:fade class="mt-3 h-100">
    <div class="flex justify-between">
    <img class="h-20" src="https://studio.code.org/v3/assets/jtsBLtSsNJI3daNYqb36EITpGdTK5dtoxHYBy-jmWEc/loaderupdated-(2).gif" alt="Loading..."/>
    <img class="h-20" src="https://studio.code.org/v3/assets/jtsBLtSsNJI3daNYqb36EITpGdTK5dtoxHYBy-jmWEc/loaderupdated-(2).gif" alt="Loading..."/>
    <img class="h-20" src="https://studio.code.org/v3/assets/jtsBLtSsNJI3daNYqb36EITpGdTK5dtoxHYBy-jmWEc/loaderupdated-(2).gif" alt="Loading..."/>

</div>
</div>
{/if}

<div class="w-full p-5">
    
</div>

</div>

<div class="no-select p-1 flex justify-between w-full fixed bottom-0 bg-gradient-to-r from-blue-500 to-cyan-500 font-main text-white text-lg">
    <h1 class="ml-2">SOURCE</h1>
    <button class="flex text-white px-2" onclick="window.open('https://github.com/JungyoKim/AUTOCODER')">
        
        <span class="mr-1">GITHUB</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
    </button>
</div>
