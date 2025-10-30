<script setup lang="ts">
  const { user, reloadUser } = useUser();

  await reloadUser();

  const currentTeamId = useCurrentTeamIdCookie();

  if (!user.value) {
    await navigateTo("/auth/login");
    throw new Error("User not found");
  }

  if (!user.value.onboardingComplete) {
    await navigateTo("/onboarding");
    throw new Error("Onboarding not complete");
  }

  const teamMemberships = user.value.teamMemberships ?? [];
  const currentTeamMembership =
    teamMemberships.find(
      (membership) => membership.team.id === currentTeamId.value,
    ) ?? teamMemberships[0];

  if (!currentTeamMembership) {
    await navigateTo("/");
  }

  currentTeamId.value = currentTeamMembership.team.id;
</script>

<template>
  <SaasNavBar />

  <main class="min-h-[calc(100vh-12rem)]">
    <slot />
  </main>

  <SaasFooter />
</template>
