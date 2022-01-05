<template>
    <div>
        <nav class="navbar">
            <router-link to="/" class="navbar-brand"><img src="../assets/img/logo.png" height="100"></router-link>
            <p class="lead" style="color: black;">
                Already have an account?
                <router-link to="/signin" class="btn btn-lg btn-outline-success">Signin</router-link>
            </p>
        </nav>
        <div class="content position-absolute text-center" style="position: absolute;">
            <form method="post" action="">
                <div class='container '>
                    <div class="form-group">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Username</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Username" name="Username" aria-describedby="inputGroup-sizing-default">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                        </div>
                        <input type="Email" class="form-control" aria-label="Email" name="Email" aria-describedby="inputGroup-sizing-default">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">password</span>
                        </div>
                        <input type="password" class="form-control" aria-label="password" name="password" aria-describedby="inputGroup-sizing-default" id="password">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend" >
                            <span class="input-group-text confirmation" id="inputGroup-sizing-default">Confirm password</span>
                        </div>
                        <input type="password" class="form-control" aria-label="Confirm password" name="confirm-password" aria-describedby="inputGroup-sizing-default" id="confirm-password">
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button type="submit" class="btn btn-primary" id="submit">submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default ({
  name: 'Signin'
})
</script>

<style>
.content{
    margin-left: 35%;
    margin-right:20%;
    margin-top: 10%;
    width: 400px;
}

@media only screen and (max-width: 650px){
    .content{
        margin: auto;
        position: relative;
        width: 100%;
        height: 100%
    }
}
</style>
