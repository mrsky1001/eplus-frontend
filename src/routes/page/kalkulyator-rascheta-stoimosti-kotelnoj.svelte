<script context="module">
    import SvelteSeo from 'svelte-seo'
</script>

<script>
    import CalcKotel from '$lib/components/calc/CalcKotel.svelte'

    let title = 'Калькулятор расчета стоимости котельной'
</script>

<style lang="scss">
  #name,
  #PhoneOrEmail,
  #gazPower {
    margin-left: 12px;
  }
</style>

<SvelteSeo {title}/>

<main class="main-content">
    <div class="container is-widescreen">
        <div class="columns">
            <div class="widget column">
                <h2 class="title">
                    <span><span>{title}</span> </span>
                    <span class="heading-line"></span>
                </h2>
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-1 is-8">
                <CalcKotel/>
            </div>
        </div>
    </div>
</main>
