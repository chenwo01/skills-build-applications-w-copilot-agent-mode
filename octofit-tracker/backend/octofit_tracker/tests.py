from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class ModelSmokeTest(TestCase):
    def test_create_team_and_user(self):
        team = Team.objects.create(name='Testers', description='QA Team')
        user = User.objects.create(name='QA Hero', email='qa@hero.com', team=team)
        self.assertEqual(user.team.name, 'Testers')

    def test_create_activity(self):
        team = Team.objects.create(name='Testers2', description='QA Team2')
        user = User.objects.create(name='QA Hero2', email='qa2@hero.com', team=team)
        activity = Activity.objects.create(user=user, type='Testing', duration=15, date=timezone.now().date())
        self.assertEqual(activity.user.name, 'QA Hero2')

    def test_create_workout_and_leaderboard(self):
        team = Team.objects.create(name='Testers3', description='QA Team3')
        workout = Workout.objects.create(name='QA Workout', description='Test workout')
        workout.suggested_for.set([team])
        leaderboard = Leaderboard.objects.create(team=team, points=42)
        self.assertEqual(leaderboard.team.name, 'Testers3')
