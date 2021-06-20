package borman.aroundthehorn.dao;

import borman.aroundthehorn.dao.rowmappers.RoomRowMapper;
import borman.aroundthehorn.models.Room;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoomDao {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public RoomDao(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Room> fetchAllRooms() {
        return jdbcTemplate.query("SELECT * FROM rooms", new RoomRowMapper());
    }

    public void insertRoom(Room room) {
        jdbcTemplate.update(
                "INSERT INTO rooms (room_name, created_by) values (:roomName, :createdBy)",
                new BeanPropertySqlParameterSource(room)
        );
    }

}