<script lang="ts">
  import { onMount } from 'svelte'
  import { type FetchUserContributionType } from '../types'
  import { fetchUserContribution } from '../utils/fetchUserContribution'

  let contributionData: FetchUserContributionType | null = null;

  onMount(async () => {
    contributionData = await fetchUserContribution();
  });

  const getColor = (contributions: number) => {
    if (contributions === 0) {
      return '#EDEDED'; 
    } else if (contributions < 10) {
      return '#ACD5F2'; 
    } else if (contributions < 20) {
      return '#7FA8C9';
    } else if (contributions < 30) {
      return '#527BA0';
    } else {
      return '#254E77'; 
    }
  };
</script>

<main>
  {#if contributionData}
    <div class="contribution-graph">
      {#each Object.entries(contributionData) as [date, contributions]}
        <div
          class="contribution-cell"
          style="background-color: {getColor(contributions)}"
        >
          <span class="tooltiptext">{contributions} contributions</span>
          <span class="tooltiptextDate">{date}</span>
        </div>
      {/each}
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
</main>

<style>
  .contribution-graph {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .contribution-cell {
    width: calc(100% / 51);
    height: 40px;
    border: 1px solid #ddd;
    position: relative;
  }

  .tooltiptext, .tooltiptextDate {
    visibility: hidden;
    width: 120px;
    background-color: #000; 
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }
 .tooltiptextDate {
    bottom: 50%;
  }

  .contribution-cell:hover .tooltiptext, .contribution-cell:hover .tooltiptextDate {
    visibility: visible;
    opacity: 1;
  }
</style>
