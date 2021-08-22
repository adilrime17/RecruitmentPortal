using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("education_major")]
    [Index(nameof(EducationLevelId), Name = "fk_education_degree_education_level1_idx")]
    public partial class EducationMajor
    {
        public EducationMajor()
        {
            CandidateHasEducations = new HashSet<CandidateHasEducation>();
            EducationSubjects = new HashSet<EducationSubject>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("education_level_id")]
        public int EducationLevelId { get; set; }
        [Required]
        [Column("name")]
        [StringLength(250)]
        public string Name { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }
        [Column("is_deleted")]
        public bool IsDeleted { get; set; }

        [ForeignKey(nameof(EducationLevelId))]
        [InverseProperty("EducationMajors")]
        public virtual EducationLevel EducationLevel { get; set; }
        [InverseProperty(nameof(CandidateHasEducation.EducationMajor))]
        public virtual ICollection<CandidateHasEducation> CandidateHasEducations { get; set; }
        [InverseProperty(nameof(EducationSubject.EducationMajor))]
        public virtual ICollection<EducationSubject> EducationSubjects { get; set; }
    }
}
