<template>
<<<<<<< HEAD
    <div class="container">
        <div class="header">
            <!-- <svg></svg> -->
            <h3>위시리스트</h3>
            <div>추가</div>
=======
    <div class="view">
        <div class="header">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14">
            <g id="구성_요소_5_1" data-name="구성 요소 5 – 1" transform="translate(1 1)">
                <line id="선_22" data-name="선 22" x2="8" fill="none" stroke="#3a404a" stroke-linecap="round" stroke-width="2"/>
                <line id="선_23" data-name="선 23" x2="15" transform="translate(0 6)" fill="none" stroke="#3a404a" stroke-linecap="round" stroke-width="2"/>
                <line id="선_24" data-name="선 24" x2="12" transform="translate(0 12)" fill="none" stroke="#3a404a" stroke-linecap="round" stroke-width="2"/>
            </g>
            </svg>
            <h5 style="flex:1; margin:auto; text-align:center;">위시리스트</h5>
            <div class="add-button">
                <span class="add-text">추가</span>
                <div class="plus-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
                </div>
            </div>
>>>>>>> 07f7fc9b0c40cc7b9d584018c94aac3cce279236
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
<<<<<<< HEAD
    .container{
        height: 100%;
        background:white;
        display:flex;
        flex-direction: column;
        font: inherit;
    }
    .header{
        flex-basis: 58px;
        display:flex;
        justify-content: space-between;
        align-items:center;
        padding: 0 2rem 0 2rem;
        box-shadow: 0 0px 15px 0px lightgray;
        h3{
            height: fit-content;
=======
    .view{
        background: white;
        height: 100%;
    }
    .header{
        display: flex;
        align-items: center;
        background: white;
        padding: 0 1rem 0 1rem;
        height: 50px;
        box-shadow: 0px 3px 6px lightgray
    }
    .add-button{
        @include flex-center();
        align-items: center;
        flex-direction: row;
        .add-text{
            font-size: 0.7rem;
        }
        .plus-button{
            border-radius: 100%;
            width:1.5rem;
            height:1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 3px 5px lightgray;
            margin-left: 0.2rem;
>>>>>>> 07f7fc9b0c40cc7b9d584018c94aac3cce279236
        }
    }
</style>