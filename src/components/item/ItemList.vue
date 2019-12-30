<template>
    <div class="container">
        <div class="header">
            <!-- <svg></svg> -->
            <h3>위시리스트</h3>
            <div>추가</div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
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
        }
    }
</style>