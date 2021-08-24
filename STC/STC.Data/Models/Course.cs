using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("course")]
    public partial class Course
    {
        public Course()
        {
            CandidateCourseSummaries = new HashSet<CandidateCourseSummary>();
            CandidateHasCourses = new HashSet<CandidateHasCourse>();
            CandidateMedicalInfos = new HashSet<CandidateMedicalInfo>();
            CandidateTestCharges = new HashSet<CandidateTestCharge>();
            CandidateTestScores = new HashSet<CandidateTestScore>();
            CourseHasTests = new HashSet<CourseHasTest>();
            PhysicalTestScores = new HashSet<PhysicalTestScore>();
            UserHasCourses = new HashSet<UserHasCourse>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(250)]
        public string Name { get; set; }
        [Column("description")]
        [StringLength(500)]
        public string Description { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }
        [Column("is_deleted")]
        public bool IsDeleted { get; set; }

        [InverseProperty(nameof(CandidateCourseSummary.Course))]
        public virtual ICollection<CandidateCourseSummary> CandidateCourseSummaries { get; set; }
        [InverseProperty(nameof(CandidateHasCourse.Course))]
        public virtual ICollection<CandidateHasCourse> CandidateHasCourses { get; set; }
        [InverseProperty(nameof(CandidateMedicalInfo.Course))]
        public virtual ICollection<CandidateMedicalInfo> CandidateMedicalInfos { get; set; }
        [InverseProperty(nameof(CandidateTestCharge.Course))]
        public virtual ICollection<CandidateTestCharge> CandidateTestCharges { get; set; }
        [InverseProperty(nameof(CandidateTestScore.Course))]
        public virtual ICollection<CandidateTestScore> CandidateTestScores { get; set; }
        [InverseProperty(nameof(CourseHasTest.Course))]
        public virtual ICollection<CourseHasTest> CourseHasTests { get; set; }
        [InverseProperty(nameof(PhysicalTestScore.Course))]
        public virtual ICollection<PhysicalTestScore> PhysicalTestScores { get; set; }
        [InverseProperty(nameof(UserHasCourse.Course))]
        public virtual ICollection<UserHasCourse> UserHasCourses { get; set; }
    }
}
