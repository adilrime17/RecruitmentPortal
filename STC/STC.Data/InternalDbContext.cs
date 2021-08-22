using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using STC.Data.Models;

#nullable disable

namespace STC.Data
{
    public partial class InternalDbContext : DbContext
    {
        public InternalDbContext()
        {
        }

        public InternalDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public virtual DbSet<Candidate> Candidates { get; set; }
        public virtual DbSet<CandidateArmyInfo> CandidateArmyInfos { get; set; }
        public virtual DbSet<CandidateCourseSummary> CandidateCourseSummaries { get; set; }
        public virtual DbSet<CandidateHasCourse> CandidateHasCourses { get; set; }
        public virtual DbSet<CandidateHasEducation> CandidateHasEducations { get; set; }
        public virtual DbSet<CandidateMedicalInfo> CandidateMedicalInfos { get; set; }
        public virtual DbSet<CandidateTestScore> CandidateTestScores { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<CourseHasTest> CourseHasTests { get; set; }
        public virtual DbSet<District> Districts { get; set; }
        public virtual DbSet<EducationDegree> EducationDegrees { get; set; }
        public virtual DbSet<EducationLevel> EducationLevels { get; set; }
        public virtual DbSet<EducationMajor> EducationMajors { get; set; }
        public virtual DbSet<EducationSubject> EducationSubjects { get; set; }
        public virtual DbSet<LocationClass> LocationClasses { get; set; }
        public virtual DbSet<PhysicalTestScore> PhysicalTestScores { get; set; }
        public virtual DbSet<Qualification> Qualifications { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<RoleHasScope> RoleHasScopes { get; set; }
        public virtual DbSet<Scope> Scopes { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }
        public virtual DbSet<Test> Tests { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserHasCourse> UserHasCourses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            modelBuilder.Entity<Candidate>(entity =>
            {
                entity.HasKey(e => e.Cnic)
                    .HasName("PRIMARY");

                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.District)
                    .WithMany(p => p.Candidates)
                    .HasForeignKey(d => d.DistrictId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_district1");

                entity.HasOne(d => d.LocationClass)
                    .WithMany(p => p.Candidates)
                    .HasForeignKey(d => d.LocationClassId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_location_class1");

                entity.HasOne(d => d.MaxQualification)
                    .WithMany(p => p.Candidates)
                    .HasForeignKey(d => d.MaxQualificationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_qualification1");
            });

            modelBuilder.Entity<CandidateArmyInfo>(entity =>
            {
                entity.HasKey(e => e.CandidateCnic)
                    .HasName("PRIMARY");

                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.CandidateCnicNavigation)
                    .WithOne(p => p.CandidateArmyInfo)
                    .HasForeignKey<CandidateArmyInfo>(d => d.CandidateCnic)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_default_candidate1");
            });

            modelBuilder.Entity<CandidateCourseSummary>(entity =>
            {
                entity.HasKey(e => new { e.CandidateCnic, e.CourseId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.HasOne(d => d.CandidateCnicNavigation)
                    .WithMany(p => p.CandidateCourseSummaries)
                    .HasForeignKey(d => d.CandidateCnic)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_has_course1_candidate1");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.CandidateCourseSummaries)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_has_course1_course1");

                entity.HasOne(d => d.District)
                    .WithMany(p => p.CandidateCourseSummaries)
                    .HasForeignKey(d => d.DistrictId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_course_summary_district1");
            });

            modelBuilder.Entity<CandidateHasCourse>(entity =>
            {
                entity.HasKey(e => new { e.CandidateCnic, e.CourseId, e.StatusId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.CandidateCnicNavigation)
                    .WithMany(p => p.CandidateHasCourses)
                    .HasForeignKey(d => d.CandidateCnic)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_has_course_candidate1");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.CandidateHasCourses)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_has_course_course1");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.CandidateHasCourses)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_has_course_status1");
            });

            modelBuilder.Entity<CandidateHasEducation>(entity =>
            {
                entity.HasKey(e => new { e.CandidateCnic, e.EducationLevelId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.CandidateCnicNavigation)
                    .WithMany(p => p.CandidateHasEducations)
                    .HasForeignKey(d => d.CandidateCnic)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_has_education_level_candidate1");

                entity.HasOne(d => d.EducationDegree)
                    .WithMany(p => p.CandidateHasEducations)
                    .HasForeignKey(d => d.EducationDegreeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_has_education_education_degree1");

                entity.HasOne(d => d.EducationLevel)
                    .WithMany(p => p.CandidateHasEducations)
                    .HasForeignKey(d => d.EducationLevelId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_has_education_level_education_level1");

                entity.HasOne(d => d.EducationMajor)
                    .WithMany(p => p.CandidateHasEducations)
                    .HasForeignKey(d => d.EducationMajorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_has_education_education_major1");

                entity.HasOne(d => d.EducationSubject)
                    .WithMany(p => p.CandidateHasEducations)
                    .HasForeignKey(d => d.EducationSubjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_has_education_education_subject1");
            });

            modelBuilder.Entity<CandidateMedicalInfo>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.CandidateCnicNavigation)
                    .WithMany(p => p.CandidateMedicalInfos)
                    .HasForeignKey(d => d.CandidateCnic)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_medical_info_candidate2");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.CandidateMedicalInfos)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_medical_info_course2");
            });

            modelBuilder.Entity<CandidateTestScore>(entity =>
            {
                entity.HasKey(e => new { e.CandidateCnic, e.CourseId, e.TestId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.CandidateCnicNavigation)
                    .WithMany(p => p.CandidateTestScores)
                    .HasForeignKey(d => d.CandidateCnic)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_has_course_has_test_candidate1");

                entity.HasOne(d => d.CourseHasTest)
                    .WithMany(p => p.CandidateTestScores)
                    .HasForeignKey(d => new { d.CourseId, d.TestId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_has_course_has_test_course_has_test1");
            });

            modelBuilder.Entity<Course>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<CourseHasTest>(entity =>
            {
                entity.HasKey(e => new { e.CourseId, e.TestId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.CourseHasTests)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_course_has_test_course1");

                entity.HasOne(d => d.Test)
                    .WithMany(p => p.CourseHasTests)
                    .HasForeignKey(d => d.TestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_course_has_test_test1");
            });

            modelBuilder.Entity<District>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<EducationDegree>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.EducationLevel)
                    .WithMany(p => p.EducationDegrees)
                    .HasForeignKey(d => d.EducationLevelId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_education_degree_education_level1");
            });

            modelBuilder.Entity<EducationLevel>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<EducationMajor>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.EducationLevel)
                    .WithMany(p => p.EducationMajors)
                    .HasForeignKey(d => d.EducationLevelId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_education_degree_education_level10");
            });

            modelBuilder.Entity<EducationSubject>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.EducationMajor)
                    .WithMany(p => p.EducationSubjects)
                    .HasForeignKey(d => d.EducationMajorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_education_subject_education_major1");
            });

            modelBuilder.Entity<LocationClass>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<PhysicalTestScore>(entity =>
            {
                entity.HasKey(e => new { e.CandidateCnic, e.CourseId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.CandidateCnicNavigation)
                    .WithMany(p => p.PhysicalTestScores)
                    .HasForeignKey(d => d.CandidateCnic)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_medical_info_candidate1");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.PhysicalTestScores)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_candidate_medical_info_course1");
            });

            modelBuilder.Entity<Qualification>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<RoleHasScope>(entity =>
            {
                entity.HasKey(e => new { e.RoleId, e.ScopeId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RoleHasScopes)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_role_has_scope_role1");

                entity.HasOne(d => d.Scope)
                    .WithMany(p => p.RoleHasScopes)
                    .HasForeignKey(d => d.ScopeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_role_has_scope_scope1");
            });

            modelBuilder.Entity<Scope>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.CreateTime).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_user_role");
            });

            modelBuilder.Entity<UserHasCourse>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.CourseId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.UserHasCourses)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_user_has_course_course1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserHasCourses)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_user_has_course_user1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
