<script context="module">
    // for passing focus on to the next Modal in the queue.
    // A module context level object is shared among all its component instances. [Read More Here](https://svelte.dev/tutorial/sharing-code)
    const modalList = []
</script>
<script>
    import {modalStore} from '$lib/stores'

    const store = modalStore(false)
    const {isOpen, open, close} = store

    function keydown(e) {
        e.stopPropagation()
        if (e.key === 'Escape') {
            close()
        }
    }

    function transitionend(e) {
        const node = e.target
        node.focus()
    }

    function modalAction(node) {
        const returnFn = []
        // for accessibility
        if (document.body.style.overflow !== 'hidden') {
            const original = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            returnFn.push(() => {
                document.body.style.overflow = original
            })
        }
        node.addEventListener('keydown', keydown)
        node.addEventListener('transitionend', transitionend)
        node.focus()
        modalList.push(node)
        returnFn.push(() => {
            node.removeEventListener('keydown', keydown)
            node.removeEventListener('transitionend', transitionend)
            modalList.pop()
            // Optional chaining to guard against empty array.
            modalList[modalList.length - 1]?.focus()
        })
        return {
            destroy: () => returnFn.forEach((fn) => fn()),
        }
    }
</script>
<style>
    /*div.modal {*/
    /*    position: fixed;*/
    /*    top: 0;*/
    /*    left: 0;*/
    /*    width: 100%;*/
    /*    height: 100vh;*/

    /*    display: flex;*/
    /*    justify-content: center;*/
    /*    align-items: center;*/
    /*    opacity: 1;*/
    /*}*/

    /*div.modal:not(:focus-within) {*/
    /*    transition: opacity 0.1ms;*/
    /*    opacity: 0.99;*/
    /*}*/

    /*div.backdrop {*/
    /*    background-color: rgba(0, 0, 0, 0.4);*/
    /*    position: absolute;*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*}*/

    /*div.content-wrapper {*/
    /*    z-index: 10;*/
    /*    max-width: 70vw;*/
    /*    border-radius: 0.3rem;*/
    /*    background-color: white;*/
    /*    overflow: hidden;*/
    /*    padding: 1rem;*/
    /*}*/

    /*!*   @media (max-width: 767px) {*/
    /*    div.content-wrapper {*/
    /*      max-width: 100vw;*/
    /*    }*/
    /*  } *!*/
    /*div.content {*/
    /*    max-height: 50vh;*/
    /*    overflow: auto;*/
    /*}*/

    /*h1 {*/
    /*    opacity: 0.5;*/
    /*}*/
</style>

<slot name="trigger" {open}>
    <!-- fallback trigger to open the modal -->
    <!--    <button on:click={open}>Open</button>-->
</slot>

{#if $isOpen}
    <!-- tabindex is required, because it tells the browser that this div element is focusable and hence triggers the keydown event -->
    <div class="modal is-active" use:modalAction tabindex="0">
<!--        <div class="backdrop" on:click={close}></div>-->
        <div class="modal-background" on:click={close}></div>
        <button aria-label="close" class="modal-close is-large" on:click={close}></button>
        <slot name="content" {store}/>

<!--        <div class="content-wrapper">-->
<!--            <slot name="header" {store}>-->
<!--                &lt;!&ndash; fallback &ndash;&gt;-->
<!--                &lt;!&ndash;                <div>&ndash;&gt;-->
<!--                &lt;!&ndash;                    <h1>Your Modal Heading Goes Here...</h1>&ndash;&gt;-->
<!--                &lt;!&ndash;                </div>&ndash;&gt;-->
<!--            </slot>-->

<!--            <div class="content">-->
<!--                <slot name="content" {store}/>-->
<!--            </div>-->

<!--            <slot name="footer" {store}>-->
<!--                &lt;!&ndash; fallback &ndash;&gt;-->
<!--                &lt;!&ndash;                <div>&ndash;&gt;-->
<!--                &lt;!&ndash;                    <h1>Your Modal Footer Goes Here...</h1>&ndash;&gt;-->
<!--                &lt;!&ndash;                    <button on:click={close}>Close</button>&ndash;&gt;-->
<!--                &lt;!&ndash;                </div>&ndash;&gt;-->
<!--            </slot>-->
<!--        </div>-->
    </div>
{/if}