using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("candidate_has_education")]
    [Index(nameof(EducationDegreeId), Name = "fk_candidate_has_education_education_degree1_idx")]
    [Index(nameof(EducationMajorId), Name = "fk_candidate_has_education_education_major1_idx")]
    [Index(nameof(EducationSubjectId), Name = "fk_candidate_has_education_education_subject1_idx")]
    [Index(nameof(CandidateCnic), Name = "fk_candidate_has_education_level_candidate1_idx")]
    [Index(nameof(EducationLevelId), Name = "fk_candidate_has_education_level_education_level1_idx")]
    public partial class CandidateHasEducation
    {
        [Key]
        [Column("candidate_cnic")]
        [StringLength(50)]
        public string CandidateCnic { get; set; }
        [Key]
        [Column("education_level_id")]
        public int EducationLevelId { get; set; }
        [Column("education_degree_id")]
        public int? EducationDegreeId { get; set; }
        [Column("education_major_id")]
        public int? EducationMajorId { get; set; }
        [Column("education_subject_id")]
        public int? EducationSubjectId { get; set; }
        [Column("total_marks")]
        public float TotalMarks { get; set; }
        [Column("obtained_marks")]
        public float ObtainedMarks { get; set; }
        [Required]
        [Column("grade")]
        [StringLength(50)]
        public string Grade { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }

        [ForeignKey(nameof(CandidateCnic))]
        [InverseProperty(nameof(Candidate.CandidateHasEducations))]
        public virtual Candidate CandidateCnicNavigation { get; set; }
        [ForeignKey(nameof(EducationDegreeId))]
        [InverseProperty("CandidateHasEducations")]
        public virtual EducationDegree EducationDegree { get; set; }
        [ForeignKey(nameof(EducationLevelId))]
        [InverseProperty("CandidateHasEducations")]
        public virtual EducationLevel EducationLevel { get; set; }
        [ForeignKey(nameof(EducationMajorId))]
        [InverseProperty("CandidateHasEducations")]
        public virtual EducationMajor EducationMajor { get; set; }
        [ForeignKey(nameof(EducationSubjectId))]
        [InverseProperty("CandidateHasEducations")]
        public virtual EducationSubject EducationSubject { get; set; }
    }
}
