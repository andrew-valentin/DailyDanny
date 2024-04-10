<script lang>
    import '/src/lib/sharedStyle.css'
    import CreateUserPopup from '/src/routes/profile/createUser/createUser.svelte';
    import ChangePasswordPopup from '/src/routes/profile/changePassword/changePassword.svelte';
    import LogoutPopup from '/src/routes/profile/logout/logout.svelte';

    let changePasswordPopupVisible = false;
    let logoutPopupVisible = false;

    function toggleChangePasswordPopup() {
        changePasswordPopupVisible = !changePasswordPopupVisible;
    }

    function toggleLogoutPopup() {
        logoutPopupVisible = !logoutPopupVisible;
    }

    function closeChangePasswordPopup() {
        changePasswordPopupVisible = false;
    }

    function closeLogoutPopup() {
        logoutPopupVisible = false;
    }
</script>

<div class="profile">
  <a id="change-password" on:click={toggleChangePasswordPopup}>Change your password</a><br/>
  <a id="logout" on:click={toggleLogoutPopup}>Logout</a>
</div>

{#if changePasswordPopupVisible}
    <ChangePasswordPopup on:close={closeChangePasswordPopup}/>
{/if}
{#if logoutPopupVisible}
  <LogoutPopup on:close={closeLogoutPopup}/>
{/if}

<style>
  .profile {
      margin-top: 175px;
  }
</style>