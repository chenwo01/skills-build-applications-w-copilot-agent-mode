from rest_framework import serializers
from .models import User, Team, Activity, Workout, Leaderboard

class TeamBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'description']

class TeamSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()
    members_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'members', 'members_count']
    
    def get_members(self, obj):
        return [{'id': member.id, 'name': member.name, 'email': member.email} for member in obj.members.all()]
    
    def get_members_count(self, obj):
        return obj.members.count()

class UserSerializer(serializers.ModelSerializer):
    team = TeamBriefSerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='team', write_only=True, required=False)
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'team', 'team_id', 'is_superhero']

class UserSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email']

class ActivitySerializer(serializers.ModelSerializer):
    user = UserSummarySerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user', write_only=True)
    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_id', 'type', 'duration', 'date']

class WorkoutSerializer(serializers.ModelSerializer):
    suggested_for = TeamSerializer(many=True, read_only=True)
    suggested_for_ids = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='suggested_for', many=True, write_only=True, required=False)
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'suggested_for', 'suggested_for_ids']

class LeaderboardSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='team', write_only=True)
    class Meta:
        model = Leaderboard
        fields = ['id', 'team', 'team_id', 'points']
