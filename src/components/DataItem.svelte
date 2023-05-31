<script>
    export let data;
    import { createEventDispatcher } from "svelte";
    import { Base64 } from 'js-base64';

let divToCopy;
let copyButton;

function copyContent() {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(divToCopy);
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    document.execCommand("copy");
    selection.removeAllRanges();
  } catch (err) {
    console.error("copied", err);
  }
}
    const dispatch = createEventDispatcher();
    
    function remove() {
      dispatch("remove");
    }
  </script>

  <div class="grid grid-cols-1 gap-y-3 mt-3 grid-flow-row-dense font-main">
    <div class="rounded-lg shadow-2xl">
        <div class="grid grid-cols-1 grid-flow-row-dense">
            <div class="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-lg shadow-xl col-span-1 text-center p-2 text-md">
                <div class="flex justify-between">
                        <p class="no-select bg-white rounded-lg px-1 mr-1">ID {data.id}</p>
                    <div class="flex justify-between">
                    <button bind:this={copyButton} on:click={copyContent} class="flex justify-between hover:bg-white rounded-lg px-1 mr-1">
                        <span class="no-select mr-1">복사</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                    
                    <button on:click="{remove}" class="flex justify-between hover:bg-red-500 hover:text-white rounded-lg px-1 ml-1">
                        <span class="no-select mr-1">삭제</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-b-lg shadow-xl col-span-1 text-left p-3 font-code text-md"><pre bind:this={divToCopy} class="code-snippet">{Base64.atob(data.code)}</pre></div>
        </div>
    </div>
    </div>